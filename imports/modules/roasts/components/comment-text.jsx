import React from 'react';

export const CommentText = ({ comment }) =>
  <div className="roast-comment-text">
    <p>{ comment.content }</p>
  </div>

CommentText.propTypes = {
  comment: React.PropTypes.object,
};
