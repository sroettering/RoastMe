import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

Meteor.publish('loggedinUser', function() {
  return Meteor.users.find({}, {
    fields: {
      profile: 1,
      services: 1,
      /*'services.facebook.email': 1,
      'services.facebook.id': 1,
      'services.facebook.gender': 1,
      'services.facebook.age_range': 1,
      'services.google.email': 1,*/
      roles: 1,
      createdAt: 1,
      updatedAt: 1,
      rulesAccepted: 1,
      tosAccepted: 1,
    },
  });
});

Meteor.publish('user', function(id) {
  check(id, String);
  return Meteor.users.find(id, {
    fields: {
      profile: 1,
      emails: 1,
      createdAt: 1,
      updatedAt: 1,
      'services.facebook.age_range': 1,
      'services.facebook.email': 1,
      'services.facebook.gender': 1,
      'services.facebook.id': 1,
      'services.google.age_range': 1,
      'services.google.email': 1,
      'services.google.gender': 1,
      'services.google.picture': 1,
    },
  });
});
