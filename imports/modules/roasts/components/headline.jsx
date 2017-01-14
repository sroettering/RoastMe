import React from 'react';
import { Link } from 'react-router';

export const Headline = ({ roastUrl, roastTitle, userId, username }) =>
  <div className="roast-section">
    <div>
      <h2><Link to={ roastUrl }>{ roastTitle }</Link></h2>
      <Link to={ `/user/${userId}` }>{ username }</Link>
    </div>
  </div>

Headline.propTypes = {
  roastUrl: React.PropTypes.string,
  roastTitle: React.PropTypes.string,
}
