import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { _ } from 'meteor/underscore';

import { Roasts } from '/imports/modules/roasts/roasts-collection';
import { Comments } from '/imports/modules/roasts/comments-collection';
import { checkAmazonUrlValidity } from '/imports/modules/utility/amazon-url-validity';

const getUserImage = (user) => {
  if(user.services.facebook) {
    return user.services.facebook.picture;
  } else if(user.services.google) {
    return user.services.google.picture;
  }
}

Meteor.methods({
  createRoast(imageUrl, title) {
    check(imageUrl, String);
    check(title, String);
    checkAmazonUrlValidity(imageUrl);

    if(!this.userId) return;
    const user = Meteor.users.findOne(this.userId);
    const userName = user.profile.username || user.profile.name;
    const userImage = getUserImage(user);

    let roast = Roasts.findOne({ userId: this.userId, imageUrl: imageUrl });
    if(roast) throw new Meteor.Error("You already uploaded this file!");

    roast = {
      title,
      userId: this.userId,
      userName,
      userImage,
      imageUrl,
    };

    return Roasts.insert(roast);
  },
  deleteRoast(roastId) {
    check(roastId, String);

    if(!this.userId) return;
    // TODO add remove hook to comments
    Roasts.delete({ _id: roastId, userId: this.userId });
  },
  createComment(roastId, commentId, text) {
    check(roastId, String);
    check(commentId, Match.OneOf(String, null));
    check(text, String);

    //TODO: clean text!

    if(!this.userId) return;
    const user = Meteor.users.findOne(this.userId);

    const roast = Roasts.findOne(roastId);
    if(!roast) return;

    if(roast.status !== 'accepted') return;

    let comment;
    if(commentId) {
      comment = Comments.findOne(commentId);
      if(!comment) return;
    }

    const userImage = getUserImage(user);

    const newComment = {
      content: text,
      userId: user._id,
      userName: user.profile.username || user.profile.name,
      userImage,
      roastId: roastId,
      replyTo: commentId || undefined,
    }

    Comments.insert(newComment);
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

    let points = comment.points;
    let roastPoints = roast.totalUpvotes - points;

    // revert upvote if clicked twice
    const upvote = _.findWhere(comment.upvotes, { userId });
    const downvote = _.findWhere(comment.downvotes, { userId });
    if(upvote) {
      points = Math.max(0, points - 1);
      Comments.update({ _id: commentId }, {
        $pull: { upvotes: upvote },
        $set: { points: points },
      });
    } else if(downvote) {
      points += 2;
      Comments.update({ _id: commentId }, {
        $push: { upvotes: { userId, createdAt: new Date() } },
        $pull: { downvotes: downvote },
        $set: { points: points },
      });
    } else {
      points++;
      Comments.update({ _id: commentId }, {
        $push: { upvotes: { userId, createdAt: new Date() } },
        $set: { points: points },
      });
    }

    roastPoints += points;
    Roasts.update({ _id: roast._id }, { $set: { totalUpvotes: roastPoints } });
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

    let points = comment.points;
    let roastPoints = roast.totalUpvotes - points;

    // revert downvote if clicked twice
    const upvote = _.findWhere(comment.upvotes, { userId });
    const downvote = _.findWhere(comment.downvotes, { userId });
    if(downvote) {
      points++;
      Comments.update({ _id: commentId }, {
        $pull: { downvotes: downvote },
        $set: { points: points },
      });
    } else if(upvote && points > 1) {
      points = Math.max(0, points - 2);
      Comments.update({ _id: commentId }, {
        $pull: { upvotes: upvote },
        $push: { downvotes: { userId, createdAt: new Date() } },
        $set: { points: points },
      });
    } else if(upvote && points <= 1) {
      points = Math.max(0, points - 1);
      Comments.update({ _id: commentId }, {
        $pull: { upvotes: upvote },
        $set: { points: points },
      });
    } else {
      points = Math.max(0, points - 1);
      Comments.update({ _id: commentId }, {
        $push: { downvotes: { userId, createdAt: new Date() } },
        $set: { points: points },
      });
    }

    roastPoints += points;
    Roasts.update({ _id: roast._id }, { $set: { totalUpvotes: roastPoints } });
  },
  acceptRoast(roastId) {
    check(roastId, String);

    if(!this.userId) return;
    if(!Roles.userIsInRole(this.userId, 'admin')) return;

    const roast = Roasts.findOne({ _id: roastId, status: { $ne: 'accepted' } });
    if(!roast) return;

    Roasts.update({ _id: roastId }, { $set: { status: 'accepted' } });
  },
  declineRoast(roastId) {
    check(roastId, String);

    if(!this.userId) return;
    if(!Roles.userIsInRole(this.userId, 'admin')) return;

    const roast = Roasts.findOne({ _id: roastId, status: { $ne: 'declined' } });
    if(!roast) return;

    Roasts.update({ _id: roastId }, { $set: { status: 'declined' } });
  },
});
