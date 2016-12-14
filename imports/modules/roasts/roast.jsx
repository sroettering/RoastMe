import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { createContainer } from 'meteor/react-meteor-data';
import { browserHistory, Link } from 'react-router';

import { Roasts } from './roasts-collection';
import { Comments } from './comments-collection';
import { upvote } from './voting';
import { downvote } from './voting';
import { ToggleButton } from '/imports/modules/ui/toggle-button';
import { TextArea } from '/imports/modules/ui/textarea';

class RoastC extends Component {

  constructor(props) {
    super(props);
    this.renderHeadline = this.renderHeadline.bind(this);
    this.renderRoastImage = this.renderRoastImage.bind(this);
    this.renderSocials = this.renderSocials.bind(this);
    this.renderScore = this.renderScore.bind(this);
    this.renderCommentSection = this.renderCommentSection.bind(this);
    this.renderComment = this.renderComment.bind(this);
    this.renderCommentControls = this.renderCommentControls.bind(this);
    this.renderContent = this.renderContent.bind(this);
    this.renderReplies = this.renderReplies.bind(this);
    this.state = {
      replyingTo: null,
    }
  }

  renderHeadline() {
    return (
      <div className="roast-section">
        <div>
          <h2><Link to={`/roast/${this.props.roast._id}`}>{ this.props.roast.title }</Link></h2>
        </div>
      </div>
    );
  }

  renderRoastImage() {
    return (
      <div className="roast-section" onClick={ this.handleClick.bind(this) }>
        <div>
          <img className="roast-image" src={ this.props.roast.imageUrl } alt={ this.props.roast.title } />
        </div>
      </div>
    );
  }

  renderSocials() {
    return (
      <div className="roast-social-media">
        <ul>
          <li><a href="#" className="button mdi mdi-facebook"><span>Facebook</span></a></li>
          <li><a href="#" className="button mdi mdi-twitter"><span>Twitter</span></a></li>
        </ul>
      </div>
    );
  }

  renderScore() {
    return (
      <div className="roast-score">
        <p className="big">
          Roasts:
          <span>{ this.props.totalComments }<i className="icon-comment"></i></span>
        </p>
        <p className="big">
          Points:
          <span>{ this.props.totalPoints }<i className="icon-point"></i></span>
        </p>
      </div>
    );
  }

  renderCommentSection(comments) {
    return (
      <div className="roast-section">
        { comments.map((comment, index) => {
          return this.renderComment(comment);
        }) }
      </div>
    );
  }

  renderComment(comment) {
    return (
      <div key={ comment._id }>
        { this.renderContent(comment) }
        { this.renderReplies(comment) }
      </div>
    );
  }

  renderReplies(comment) {
    const replies = comment.replies || [];
    return (
      <div className="roast-comment-answers">
        { replies.map((reply, index) => {
          return (
            <div className="roast-answer" key={ reply._id }>
              { this.renderContent(reply) }
            </div>
          );
        }) }
      </div>
    );
  }

  renderContent(comment) {
    return (
      <div className="roast-comment">
        <div className="roast-comment-profile">
          <Link to={ `/user/${comment.userId}` }><img src={ comment.userImage } alt={ comment.userName } /></Link>
          <h3><Link to={ `/user/${comment.userId}` }>{ comment.userName }</Link></h3>
          <p className="big">{ comment.points }<span className="mdi mdi-trophy-award"></span></p>
        </div>
        <div className="roast-comment-text">
          <p>{ comment.content }</p>
        </div>
        { this.renderCommentControls(comment) }
        { this.state.replyingTo === comment._id ?
          <TextArea
            roast={ this.props.roast }
            comment={ comment }
            onCommented={ this.closeTextArea.bind(this) } />
          : '' }
      </div>
    );
  }

  renderCommentControls(comment) {
    const upToggled = !!_.findWhere(comment.upvotes, { userId: Meteor.userId() });
    const downToggled = !!_.findWhere(comment.downvotes, { userId: Meteor.userId() });
    return (
      <div className="roast-comment-reply">
        <ul>
          { this.props.single ?
            (<li><a href="#!" className="button mdi mdi-reply" onClick={ this.handleReply.bind(this, comment) }><span>Reply</span></a></li>)
            : ''}
          <li>
            <ToggleButton callback={ upvote.bind(this, comment._id) } icon="mdi mdi-arrow-up-bold-circle" toggled={ upToggled } enabled={ true } />
          </li>
          <li>
            <ToggleButton callback={ downvote.bind(this, comment._id) } icon="mdi mdi-arrow-down-bold-circle" toggled={ downToggled } enabled={ comment.points > 0 || downToggled } />
          </li>
        </ul>
      </div>
    );
  }

  handleReply(comment, event) {
    event.preventDefault();
    this.setState({ replyingTo: comment._id });
  }

  closeTextArea() {
    this.setState({ replyingTo: null });
  }

  render() {
    if(this.props.roast && this.props.comments) {
      return (
        <div className="roast">
          { this.renderHeadline() }
          { this.renderRoastImage() }
          { this.props.single ? <TextArea roast={ this.props.roast } /> : '' }
          <div className="roast-section">
            <div>
              { this.renderScore() }
              { this.renderSocials() }
            </div>
          </div>
          { this.renderCommentSection(this.props.comments) }
        </div>
      );
    } else {
      return (
        <h3>Loading...</h3>
      );
    }
  }

  handleClick(event) {
    if(!this.props.single) browserHistory.push(`/roast/${this.props.roast._id}`);
  }
}

RoastC.propTypes = {
  roast: React.PropTypes.object,
  comments: React.PropTypes.array, // these are not the raw db comments
  totalComments: React.PropTypes.number,
  totalPoints: React.PropTypes.number,
};

export const Roast = createContainer(({roast, single}) => {
  if(!roast) return {};
  if(single) {
    Meteor.subscribe('all-comments-for-roast', roast._id);
  } else {
    Meteor.subscribe('top-comments-for-roast', roast._id);
  }

  const allComments = Comments.find({roastId: roast._id}).fetch();
  const totalComments = roast.totalComments;
  const totalPoints = _.reduce(allComments, (mem, c) => mem + c.points, 0);
  let comments;
  if(allComments) {
    comments = _.filter(allComments, (c) => !c.replyTo);
    _.each(comments, (comment) => {
      replies = _.filter(allComments, (c) => !!c.replyTo && c.replyTo === comment._id);
      comment.replies = _.sortBy(replies, 'createdAt').reverse();
    });
  }
  return {
    comments,
    totalComments,
    totalPoints,
  }
}, RoastC);
