import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

// all accounts associated with these email adresses receive admin rights
const adminEmails = [
  'svenroettering@web.de',
  'king78176@yahoo.de',
  'Rosenboom.benjamin@aol.com',
  'k-wiese@web.de',
  'facebook@tim-tilch.de',
];

/*
const makeAdmins = () => {
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
}
*/

const giveRoles = (userId, doc) => {
  const email = doc.services.facebook ? doc.services.facebook.email : doc.services.google ? doc.services.google.email : '';
  if(adminEmails.includes(email)) {
    Roles.addUsersToRoles(doc, 'admin');
  } else {
    Roles.addUsersToRoles(doc, 'user');
  }
}

Meteor.users.after.insert(function(userId, doc) {
  giveRoles(userId, doc);
});
