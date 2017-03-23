import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Roasts } from '../roasts-collection';
import { Comments } from '../comments-collection';

// ----------------- Roasts -----------------

Meteor.publish('roasts.hot', function(limit) {
  check(limit, Number);
  return Roasts.find({
    status: 'accepted',
    "category.name": 'hot'
  }, {
    sort: { createdAt: -1 },
    limit: limit,
    fields: {
      status: 0,
      createdAt: 0,
      updatedAt: 0,
    },
  });
});

Meteor.publish('roasts.trending', function(limit) {
  check(limit, Number);
  return Roasts.find({
    status: 'accepted',
    "category.name": 'trending'
  }, {
    sort: { createdAt: -1 },
    limit: limit,
    fields: {
      status: 0,
      createdAt: 0,
      updatedAt: 0,
    },
  });
});

Meteor.publish('roasts.new', function(limit) {
  check(limit, Number);
  return Roasts.find({
    status: 'accepted',
    "category.name": 'new'
  }, {
    sort: { createdAt: -1 },
    limit: limit,
    fields: {
      status: 0,
      createdAt: 0,
      updatedAt: 0,
    },
  });
});

Meteor.publish('roasts.single', function(roastId) {
  check(roastId, String);
  return Roasts.find({
    _id: roastId,
    status: 'accepted'
  }, {
    fields: {
      status: 0,
      createdAt: 0,
      updatedAt: 0,
    },
  });
});

Meteor.publish('roasts.all.user', function(userId){
  check(userId, String);
  return Roasts.find({
    userId: userId,
    status: 'accepted'
  }, {
    fields: {
      status: 0,
      createdAt: 0,
      updatedAt: 0,
    },
  });
});

Meteor.publish('roasts.admin.queued', function() {
  return Roasts.find({ status: 'queued' }, { sort: { createdAt: 1 } });
});

if (Meteor.isServer) {
  Roasts._ensureIndex({ status: 1, totalUpvotes: 1 });
  Roasts._ensureIndex({ status: 1, totalComments: 1 });
  Roasts._ensureIndex({ status: 1, createdAt: 1 });
  Roasts._ensureIndex({ _id: 1, status: 1 });
  Roasts._ensureIndex({ userId: 1, status: 1 });
  Roasts._ensureIndex({ _id: 1, userId: 1 });
  Roasts._ensureIndex({ status: 1, "category.name": 1, "category.enteredAt": 1 });
}


// ----------------- Comments -----------------

Meteor.publish('comments.all.roastneighbours', function(roastId) {
  check(roastId, String);
  const comments = Comments.find({
    roastId: roastId
  }, {
    fields: {
      updatedAt: 0,
    }
  });
  const roast = Roasts.findOne({ _id: roastId }, { fields: { status: 0, createdAt: 0, updatedAt: 0 } });
  const pub = [comments];
  if(roast) {
    this.added('roasts', roast._id, roast);
    roastNext = Roasts.findOne({
      _id: { $ne: roast._id },
      "category.name": roast.category.name,
      "category.enteredAt": { $lt: roast.category.enteredAt },
      status: 'accepted',
    }, {
      sort: { "category.enteredAt": -1 },
      fields: { _id: 1, "category.enteredAt": 1 },
    });
    if(roastNext) this.added('roasts', roastNext._id, roastNext);
    roastPrev = Roasts.findOne({
      _id: { $ne: roast._id },
      "category.name": roast.category.name,
      "category.enteredAt": { $gt: roast.category.enteredAt },
      status: 'accepted',
    }, {
      sort: { "category.enteredAt": 1 },
      fields: { _id: 1, "category.enteredAt": 1 },
    });
    if(roastPrev) this.added('roasts', roastPrev._id, roastPrev);
  }
  this.ready();
  return pub;
});

Meteor.publish('comments.roast.top', function(roastId) {
  check(roastId, String);
  return Comments.find({
    roastId: roastId,
    replyTo: null
  }, {
    sort: { points: -1 },
    limit: 1,
    fields: {
      upvotes: 0,
      downvotes: 0,
      updatedAt: 0,
    }
  });
});

Meteor.publish('comments.all.user', function(userId){
  check(userId, String);
  return Comments.find({
    userId: userId,
    replyTo: null
  }, {
    sort: { points: -1 },
    fields: {
      updatedAt: 0,
    }
  });
});

if (Meteor.isServer) {
  Comments._ensureIndex({ replyTo: 1, points: 1, userId: 1, roastId: 1 });
  Comments._ensureIndex({ points: 1, userId: 1, roastId: 1, replyTo: 1 });
  Comments._ensureIndex({ userId: 1, replyTo: 1, points: 1 });
  Comments._ensureIndex({ roastId: 1, replyTo: 1, points: 1});
}
