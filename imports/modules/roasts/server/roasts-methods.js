import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { _ } from 'meteor/underscore';

import { Roasts } from '/imports/modules/roasts/roasts-collection';
import { Comments } from '/imports/modules/roasts/comments-collection';

Meteor.methods({
  createRoast() {
    if(!this.userId) return;

  },
  upvoteComment(commentId) {
    check(commentId, String);

    if(!this.userId) return;
    const userId = this.userId;

    const comment = Comments.findOne(commentId);
    if(!comment) return;

    // prevent voting own comments
    if(comment.userId === userId) return;

    const roast = Roasts.findOne({ _id: comment.roastId });
    if(!roast) return;

    const points = comment.points;

    // revert upvote if clicked twice
    const upvote = _.findWhere(comment.upvotes, { userId });
    const downvote = _.findWhere(comment.downvotes, { userId });
    if(upvote) {
      Comments.update({ _id: commentId }, {
        $pull: { upvotes: upvote },
        $set: { points: Math.max(0, points - 1) },
      });
    } else if(downvote) {
      Comments.update({ _id: commentId }, {
        $push: { upvotes: { userId, createdAt: new Date() } },
        $pull: { downvotes: downvote },
        $set: { points: points + 2 },
      });
    } else {
      Comments.update({ _id: commentId }, {
        $push: { upvotes: { userId, createdAt: new Date() } },
        $set: { points: points + 1 },
      });
    }
  },
  downvoteComment(commentId) {
    check(commentId, String);

    if(!this.userId) return;
    const userId = this.userId;

    const comment = Comments.findOne(commentId);
    if(!comment) return;

    // prevent downvoting own comments
    if(comment.userId === userId) return;

    const roast = Roasts.findOne({ _id: comment.roastId });
    if(!roast) return;

    const points = comment.points;

    // revert downvote if clicked twice
    const upvote = _.findWhere(comment.upvotes, { userId });
    const downvote = _.findWhere(comment.downvotes, { userId });
    if(downvote) {
      Comments.update({ _id: commentId }, {
        $pull: { downvotes: downvote },
        $set: { points: points + 1 },
      });
    } else if(upvote && points > 1) {
      Comments.update({ _id: commentId }, {
        $pull: { upvotes: upvote },
        $push: { downvotes: { userId, createdAt: new Date() } },
        $set: { points: Math.max(0, points - 2) },
      });
    } else if(upvote && points <= 1) {
      Comments.update({ _id: commentId }, {
        $pull: { upvotes: upvote },
        $set: { points: Math.max(0, points - 1) },
      });
    } else {
      Comments.update({ _id: commentId }, {
        $push: { downvotes: { userId, createdAt: new Date() } },
        $set: { points: Math.max(0, points - 1) },
      });
    }
  },
});
