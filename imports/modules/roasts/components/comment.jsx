import React, { Component } from 'react';
import { Link } from 'react-router';

import { TextArea } from '/imports/modules/ui/textarea';
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
    const { comment, roast } = this.props;
    return (
      <div className="comment-wrapper">
        <div className="roast-comment">
          <div className="roast-comment-profile">
            <Link to={ `/user/${comment.userId}` }><img src={ comment.userImage } alt={ comment.userName } /></Link>
            <h3><Link to={ `/user/${comment.userId}` }>{ comment.userName }</Link></h3>
            <p className="big">{ comment.points }<span className="mdi mdi-trophy-award"></span></p>
          </div>
          <div className="roast-comment-text">
            <p>{ comment.content }</p>
          </div>
          <CommentControls comment={ comment } replyTo={ this.openTextArea.bind(this) }/>
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
};
