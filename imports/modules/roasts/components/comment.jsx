import React, { Component } from 'react';
import { Link } from 'react-router';
import { moment } from 'meteor/momentjs:moment';
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';

import { TextArea } from '/imports/modules/ui/textarea';
import { CommentProfile } from './comment-profile';
import { CommentText } from './comment-text';
import { CommentControls } from './comment-controls';
import { Replies } from './replies';

class CommentC extends Component {
  constructor(props) {
    super(props);
    this.state = {
      replyingTo: null,
    };
  }

  openTextArea() {
    this.setState({ replyingTo: this.props.comment._id });
  }

  commentOnRoast(text) {
    this.setState({ replyingTo: null });
  }

  render() {
    const { comment, roast, single, time } = this.props;
    return (
      <div className="comment-wrapper">
        <div className="roast-comment">
          <CommentProfile comment={ comment } />
          <CommentText comment={ comment } time={ time } />
          <CommentControls comment={ comment } replyTo={ this.openTextArea.bind(this) } single={ single } />
          { this.state.replyingTo === comment._id ?
            <TextArea
              roast={ roast }
              comment={ comment }
              onCommented={ this.commentOnRoast.bind(this) } />
            : '' }
        </div>
        <Replies replies={ comment.replies || [] } roast={ roast } />
      </div>
    );
  }
}

CommentC.propTypes = {
  comment: React.PropTypes.object,
  roast: React.PropTypes.object,
  single: React.PropTypes.bool,
  time: React.PropTypes.string,
};

export const Comment = createContainer(({ comment }) => {
  const hoursPassed = moment(Session.get('now')).diff(comment.createdAt, 'hours');
  let timeString = moment(comment.createdAt).fromNow();
  if(hoursPassed >= 24) {
    timeString = moment(comment.createdAt).format('DD.MM.YY - HH:mm');
  }
  return {
    time: timeString,
  }
}, CommentC);
