import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

Meteor.publish('loggedinUser', function() {
  return Meteor.users.find({ _id: this.userId }, {
    fields: {
      profile: 1,
      'services.facebook.picture': 1,
      'services.google.picture': 1,
      roles: 1,
      createdAt: 1,
      rulesAccepted: 1,
      tosAccepted: 1,
    },
  });
});

Meteor.publish('user.profile', function(userId) {
  check(userId, String);
  return Meteor.users.find({ _id: userId }, {
    fields: {
      profile: 1,
      'services.facebook.picture': 1,
      'services.google.picture': 1,
      createdAt: 1,
    },
  });
});
