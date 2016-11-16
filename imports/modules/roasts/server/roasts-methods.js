import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Roasts } from '/imports/modules/roasts/roasts-collection';

Meteor.methods({
  createRoast() {
    if(!this.userId) return;

    const Roast = {
      userId: this.userId,
      imageUrl: "/Fred.jpg", // TODO: get url after upload to S3
      comments: [],
      totalUpvotes: 0,
    };

    Roasts.insert(Roast);
  },
  upvoteComment(roastId, commentId) {
    check(roastId, String);
    check(commentId, Number);

    //if(!this.userId) return;

    const userId = "fakeUser";//this.userId;

    const Roast = Roasts.findOne({ _id: roastId});
    if(!Roast) return;

    // search for a comment with the given id, which the user did not upvote aleady
    //if(!comment) return;
    //if(!_.findWhere(comment.votes, {userId})) return;

    Roast.totalUpvotes++;

    Roasts.update({_id: roastId}, {$set: Roast});
  },
});
