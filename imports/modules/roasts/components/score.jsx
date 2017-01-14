import React from 'react';

export const Score = ({ comments, points }) =>
  <div className="roast-section">
    <div className="roast-score">
      <p>
        Roasts:
        <span>{ comments }<i className="icon-comment"></i></span>
      </p>
      <p>
        Points:
        <span>{ points }<i className="icon-point"></i></span>
      </p>
    </div>
  </div>

Score.propTypes = {
  comments: React.PropTypes.number,
  points: React.PropTypes.number,
}
