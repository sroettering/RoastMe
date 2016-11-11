import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

export const isAdmin = () => {
  const user = Meteor.user();
  if (!user) return false;

  return Roles.userIsInRole(user, 'admin');
};
