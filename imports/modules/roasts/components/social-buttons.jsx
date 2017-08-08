import React from 'react';
import { ShareButtons, generateShareIcon } from 'react-share';

const FacebookIcon = generateShareIcon('facebook');
const TwitterIcon = generateShareIcon('twitter');

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
        <ShareButtons.TwitterShareButton
          url={ url }
          title={ 'Checkout this roast!' }
          hashtags={ ['roastme'] }>
          <TwitterIcon size={ 32 } />
        </ShareButtons.TwitterShareButton>
      </li>
    </ul>
  </div>
