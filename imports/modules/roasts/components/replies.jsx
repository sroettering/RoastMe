import React from 'react';

import { Comment } from './comment';

export const Replies = ({ replies, roast }) =>
  <div className="roast-comment-answers">
    { replies.map((reply, index) => {
      return (
        <div className="roast-answer" key={ index }>
          <Comment comment={ reply } roast={ roast }/>
        </div>
      );
    }) }
  </div>

Replies.propTypes = {
  replies: React.PropTypes.array,
  roast: React.PropTypes.object,
};
