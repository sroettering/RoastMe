import React from 'react';
import { browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { isAdmin } from '/imports/modules/accounts/role-helpers.js';

const handleLogout = () => Meteor.logout(() => browserHistory.push('/login'));

const userName = () => {
  const user = Meteor.user();
  const name = user && user.profile ? user.profile.name : '';
  return user ? `${name}` : '';
};

export const AuthenticatedNavigation = () => (
  <div>
    
  </div>
);
