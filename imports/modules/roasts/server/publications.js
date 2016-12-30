import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Roasts } from '../roasts-collection';
import { Comments } from '../comments-collection';

// ----------------- Roasts -----------------

Meteor.publish('hot-roasts', function(limit) {
  check(limit, Number);
  return Roasts.find({ status: 'accepted' }, { sort: { totalUpvotes: 1 }, limit: limit });
});

Meteor.publish('trending-roasts', function(limit) {
  check(limit, Number);
  return Roasts.find({ status: 'accepted' }, { sort: { totalComments: 1 }, limit: limit });
});

Meteor.publish('new-roasts', function(limit) {
  check(limit, Number);
  return Roasts.find({ status: 'accepted' }, { sort: { createdAt: -1 }, limit: limit });
});

Meteor.publish('single-roast', function(roastId) {
  check(roastId, String);
  return Roasts.find({ _id: roastId, status: 'accepted' });
});

Meteor.publish('all-roasts-for-user', function(){
  return Roasts.find({ userId: this.userId, status: 'accepted' });
});

Meteor.publish('queued-roasts', function() {
  return Roasts.find({ status: 'queued' }, { sort: { createdAt: 1 } });
});


// ----------------- Comments -----------------

Meteor.publish('all-comments', function() {
  return Comments.find();
});

Meteor.publish('all-comments-for-roast', function(roastId) {
  check(roastId, String);
  return Comments.find({roastId: roastId});
});

Meteor.publish('top-comments-for-roast', function(roastId) {
  check(roastId, String);
  return Comments.find({roastId: roastId, replyTo: null}, { sort: { points: -1 }, limit: 1 });
});

Meteor.publish('all-comments-for-user', function(userId){
  check(userId, String);
  return Comments.find({ userId: userId, replyTo: null });
});
