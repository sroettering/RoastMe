import React, { Component } from 'react';

import withDeltaTime from '/imports/decorators/withDeltaTime';
import CommentProfile from '/imports/layout/components/CommentProfile';
import { CommentText } from '/imports/modules/roasts/components/comment-text';
import { SocialButtons } from '/imports/modules/roasts/components/social-buttons';

@withDeltaTime
export default class SimpleComment extends Component {
  render() {
    const { comment, roast, time } = this.props;
    return (
      <div className="roast-section">
        <div className="comment-wrapper">
          <div className="roast-comment">
            <CommentProfile comment={ comment } />
            <CommentText comment={ comment } time={ time } />
            <div className="roast-comment-reply">
              <SocialButtons
                url={ `https://itsroast.me/roast/${roast._id}` }
                title={ roast.title }
                description={ comment.content }
                img={ roast.imageUrl } />
            </div>
          </div>
        </div>
      </div>
    );
  }
}