import React from 'react';
import { _ } from 'meteor/underscore';

import { upvote } from '../voting';
import { downvote } from '../voting';
import { ToggleButton } from '/imports/modules/ui/toggle-button';

export const CommentControls = ({ comment, replyTo }) => {
  const upToggled = !!_.findWhere(comment.upvotes, { userId: Meteor.userId() });
  const downToggled = !!_.findWhere(comment.downvotes, { userId: Meteor.userId() });
  return (
    <div className="roast-comment-reply">
      <ul>
        <li>
          <ToggleButton
            callback={ downvote.bind(null, comment._id) }
            toggled={ downToggled }
            enabled={ comment.points > 0 || downToggled }>
            <i className="icon-downvote"></i>
          </ToggleButton>
        </li>
        <li>
          <ToggleButton
            callback={ upvote.bind(null, comment._id) }
            toggled={ upToggled }
            enabled={ true }>
            <i className="icon-upvote"></i>
          </ToggleButton>
        </li>
        <li>
          <button className="flat-button" onClick={ replyTo }>Reply</button>
        </li>
      </ul>
    </div>
  );
}

CommentControls.propTypes = {
  comment: React.PropTypes.object,
  replyTo: React.PropTypes.func,
};
