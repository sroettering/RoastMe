import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

// all accounts associated with these email adresses receive admin rights
const adminEmails = [
  'svenroettering@googlemail.com',
  'king78176@yahoo.de',
  'Rosenboom.benjamin@aol.com',
];

adminEmails.forEach((email) => {
  let user = Meteor.users.findOne({
    $or: [
      { 'services.facebook.email': email },
      { 'services.google.email': email },
    ],
  });

  if (user) {
    Roles.addUsersToRoles(user, 'admin');
  }
});
