import React, { Component } from 'react';
import { Link } from 'react-router';

import { TextArea } from '/imports/modules/ui/textarea';
import { CommentProfile } from './comment-profile';
import { CommentText } from './comment-text';
import { CommentControls } from './comment-controls';
import { Replies } from './replies';

export class Comment extends Component {
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
    const { comment, roast, single } = this.props;
    return (
      <div className="comment-wrapper">
        <div className="roast-comment">
          <CommentProfile comment={ comment } />
          <CommentText comment={ comment } />
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

Comment.propTypes = {
  comment: React.PropTypes.object,
  roast: React.PropTypes.object,
  single: React.PropTypes.bool,
};
