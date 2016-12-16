import React from 'react';

import { SocialButtons } from './social-buttons';
import { Score } from './score';

export const Caption = ({ totalComments, totalPoints }) =>
  <div className="roast-section">
    <SocialButtons />
    <Score comments={ totalComments } points={ totalPoints }/>
  </div>

Caption.propTypes = {
  totalComments: React.PropTypes.number,
  totalPoints: React.PropTypes.number,
}
