import React from 'react';

export const CommentText = ({ comment, time }) =>
  <div className="roast-comment-text">
    <p>{ comment.content }</p>
    <span>{ time }</span>
  </div>

CommentText.propTypes = {
  comment: React.PropTypes.object,
  time: React.PropTypes.string,
};
