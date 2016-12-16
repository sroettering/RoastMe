import React from 'react';

export const Image = ({ imageUrl, roastTitle }) =>
  <div className="roast-section image">
    <div>
      <img className="roast-image" src={ imageUrl } alt={ roastTitle } />
    </div>
  </div>
