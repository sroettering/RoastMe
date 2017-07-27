import React from 'react';
import { Link } from 'react-router-dom';

export default Image = ({ roastId, imageUrl, roastTitle }) =>
  <div className="roast-section image">
    <Link to={ `/roast/${roastId}` }>  
      <div>
        <img className="roast-image" src={ imageUrl } alt={ roastTitle } />
      </div>
    </Link>
  </div>

Image.propTypes = {
  roastId: React.PropTypes.string,
  imageUrl: React.PropTypes.string,
  roastTitle: React.PropTypes.string
};
