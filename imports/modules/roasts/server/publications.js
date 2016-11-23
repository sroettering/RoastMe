import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Roasts } from '../roasts-collection';
import { Comments } from '../comments-collection';

// ----------------- Roasts -----------------

Meteor.publish('all-roasts', function() {
  return Roasts.find();
});

Meteor.publish('single-roast', function(roastId) {
  check(roastId, String);
  return Roasts.find(roastId);
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
  return Comments.find({roastId: roastId, replyTo: null}, { sort: { points: 1 }, limit: 5 });
});
