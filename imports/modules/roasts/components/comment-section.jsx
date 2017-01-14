import React from 'react';

import { Comment } from './comment';

export const CommentSection = ({ comments, roast, single }) =>
  <div className="roast-section">
    { comments.map((comment, index) => <Comment key={ index } single={ single } comment={ comment } roast={ roast } /> ) }
  </div>

CommentSection.propTypes = {
  comments: React.PropTypes.array,
  roast: React.PropTypes.object,
  single: React.PropTypes.bool,
};
