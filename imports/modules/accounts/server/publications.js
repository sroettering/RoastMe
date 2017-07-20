import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';

Meteor.publish('user.current', function() {
  return Meteor.users.find({ _id: this.userId }, {
    fields: {
      profile: 1,
      // 'services.facebook': 1,
      'services.facebook.picture': 1,
      'services.facebook.email': 1,
      'services.google.picture': 1,
      'services.google.email': 1,
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

Meteor.publish('user.all', function() {
  const user = Meteor.users.findOne({ _id: this.userId });
  if(Roles.userIsInRole(user, 'admin')) {
    return Meteor.users.find({}, { fields: {
        profile: 1,
        'services.facebook.picture': 1,
        'services.facebook.email': 1,
        'services.google.picture': 1,
        'services.google.email': 1,
        createdAt: 1,
        roles: 1,
      }
    });
  } else {
    this.ready();
  }
});
