import React from 'react';
import { _ } from 'meteor/underscore';

import { upvote } from '../voting';
import { downvote } from '../voting';
import { ToggleButton } from '/imports/modules/ui/toggle-button';

// TODO: make reply button a flat button
export const CommentControls = ({ comment, replyTo }) => {
  const upToggled = !!_.findWhere(comment.upvotes, { userId: Meteor.userId() });
  const downToggled = !!_.findWhere(comment.downvotes, { userId: Meteor.userId() });
  return (
    <div className="roast-comment-reply">
      <ul>
        <li>
          <a href="#!" className="button mdi mdi-reply" onClick={ replyTo }>
            <span>Reply</span>
          </a>
        </li>
        <li>
          <ToggleButton callback={ upvote.bind(null, comment._id) } icon="mdi mdi-arrow-up-bold-circle" toggled={ upToggled } enabled={ true } />
        </li>
        <li>
          <ToggleButton callback={ downvote.bind(null, comment._id) } icon="mdi mdi-arrow-down-bold-circle" toggled={ downToggled } enabled={ comment.points > 0 || downToggled } />
        </li>
      </ul>
    </div>
  );
}

CommentControls.propTypes = {
  comment: React.PropTypes.object,
  replyTo: React.PropTypes.func,
};
