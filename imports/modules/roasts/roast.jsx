import React, { Component } from 'react';
import { _ } from 'meteor/underscore';
import { createContainer } from 'meteor/react-meteor-data';

import { Roasts } from './roasts-collection';
import { Comments } from './comments-collection';

class RoastC extends Component {

  constructor(props) {
    super(props);
    this.renderHeadline = this.renderHeadline.bind(this);
    this.renderRoastImage = this.renderRoastImage.bind(this);
    this.renderSocials = this.renderSocials.bind(this);
    this.renderScore = this.renderScore.bind(this);
    this.renderCommentSection = this.renderCommentSection.bind(this);
    this.renderComment = this.renderComment.bind(this);
  }

  renderHeadline() {
    return (
      <div className="roast-section">
          <div>
              <h2>Hi, I'm {this.props.roast.userName}, #roastme !</h2>
          </div>
      </div>
    );
  }

  renderRoastImage() {
    return (
      <div className="roast-section">
          <div>
              <img className="roast-image" src={this.props.roast.imageUrl} alt="" />
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
              <li><a href="#" className="button mdi mdi-google-plus"><span>Google +</span></a></li>
          </ul>
      </div>
    );
  }

  renderScore() {
    return (
      <div className="roast-score">
          <p className="big">{this.props.totalComments}<span className="mdi mdi-fire"></span></p>
          <p className="big">{this.props.roast.totalUpvotes}<span className="mdi mdi-trophy-award"></span></p>
      </div>
    );
  }

  renderCommentSection(comments) {
    return (
      <div className="roast-section">
        { comments.map((comment, index) => {
          return (
            <div key={index}>
              { this.renderComment(comment) }
            </div>
          );
        })}
      </div>
    );
  }

  renderComment(comment) {
    return (
      <div className="roast-comment">
          <div className="roast-comment-profile">
              <img src={comment.userImage} alt="" />
              <h3>{comment.userName}</h3>
              <p className="big">{comment.votes.length}<span className="mdi mdi-trophy-award"></span></p>
          </div>
          <div className="roast-commtent-text">
              <p>
                  {comment.content}
              </p>
          </div>
          <div className="roast-comment-reply">
              <ul>
                  <li><a href="#" className="button mdi mdi-reply"><span>Reply</span></a></li>
                  <li><a href="#" className="button mdi mdi-arrow-up-bold-circle"><span>Upvote</span></a></li>
                  <li><a href="#" className="button mdi mdi-arrow-down-bold-circle"><span>Downvote</span></a></li>
              </ul>
          </div>
      </div>
    );
  }

  render() {
    if(this.props.roast && this.props.comments) {
      return (
        <div className="roast">
            { this.renderHeadline() }
            { this.renderRoastImage() }
            <div className="roast-section">
                <div>
                  { this.renderSocials() }
                  { this.renderScore() }
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
}

RoastC.propTypes = {
  roast: React.PropTypes.object,
  comments: React.PropTypes.array // these are not the raw db comments
};

// this component needs a roast and its respective comments as props
export const Roast = createContainer((props) => {
  const totalComments = props.comments.length;
  let comments;
  if(props.comments) {
    comments = _.filter(props.comments, (c) => !c.replyTo);
    _.each(comments, (comment) => {
      comment.replies = _.filter(props.comments, (c) => !!c.replyTo && c.replyTo === comment._id);
    });
  }
  return {
    comments,
    totalComments,
  }
}, RoastC);
