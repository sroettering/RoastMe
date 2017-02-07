import React from 'react';
import { ShareButtons, generateShareIcon } from 'react-share';

const FacebookIcon = generateShareIcon('facebook');
const PinterestIcon = generateShareIcon('pinterest');

export const SocialButtons = ({ url, title, description, img }) =>
  <div className="roast-social-media">
    <ul className="social-buttons">
      <li>
        <ShareButtons.FacebookShareButton
          url={ url }
          title={ title }
          description={ description }
          picture={ img }>
          <FacebookIcon size={ 32 } />
        </ShareButtons.FacebookShareButton>
      </li>
      <li>
        <ShareButtons.PinterestShareButton
          url={ url }
          media={ img }
          description={ description }>
          <PinterestIcon size={ 32 } />
        </ShareButtons.PinterestShareButton>
      </li>
    </ul>
  </div>
