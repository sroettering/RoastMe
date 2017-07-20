import React from 'react';
import { Link } from 'react-router';

export const CommentProfile = ({ comment }) =>
  <div className="roast-comment-profile">
    <Link to={ `/user/${comment.userId}` } rel='nofollow'><img src={ comment.userImage } alt={ comment.userName } /></Link>
    <h3><Link to={ `/user/${comment.userId}` } rel='nofollow'>{ comment.userName }</Link></h3>
    <p>{ comment.points } Points</p>
  </div>

CommentProfile.propTypes = {
  comment: React.PropTypes.object,
};
