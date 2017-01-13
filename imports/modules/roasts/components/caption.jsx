import React from 'react';

import { Score } from './score';

export const Caption = ({ username, totalComments, totalPoints }) =>
  <div className="roast-section">
    <p>by: { username }</p>
    <Score comments={ totalComments } points={ totalPoints }/>
  </div>

Caption.propTypes = {
  totalComments: React.PropTypes.number,
  totalPoints: React.PropTypes.number,
  username: React.PropTypes.string,
}
