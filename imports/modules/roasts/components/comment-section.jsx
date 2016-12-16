import React from 'react';

import { Comment } from './comment';

export const CommentSection = ({ comments, roast }) =>
  <div className="roast-section">
    { comments.map((comment, index) => <Comment key={ index } comment={ comment } roast={ roast } /> ) }
  </div>

CommentSection.propTypes = {
  comments: React.PropTypes.array,
};
