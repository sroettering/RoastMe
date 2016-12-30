import React from 'react';

export const Image = ({ imageUrl, roastTitle, onClick }) =>
  <div className="roast-section image" onClick={ onClick }>
    <div>
      <img className="roast-image" src={ imageUrl } alt={ roastTitle } />
    </div>
  </div>

Image.propTypes = {
  imageUrl: React.PropTypes.string,
  roastTitle: React.PropTypes.string,
  onClick: React.PropTypes.func,
};
