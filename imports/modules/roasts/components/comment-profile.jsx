import React from 'react';
import { Link } from 'react-router-dom';

export const CommentProfile = ({ comment }) =>
  <div className="roast-comment-profile">
    <Link to={ `/user/${comment.userId}` }><img src={ comment.userImage } alt={ comment.userName } /></Link>
    <h3><Link to={ `/user/${comment.userId}` }>{ comment.userName }</Link></h3>
    <p>{ comment.points } Points</p>
  </div>

CommentProfile.propTypes = {
  comment: React.PropTypes.object,
};
