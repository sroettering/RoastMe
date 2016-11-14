import React from 'react';
import { browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

const handleLogout = () => {
  Meteor.logout(() => browserHistory.push('/login'));
}

const userName = () => {
  const user = Meteor.user();
  const name = user && user.profile ? user.profile.name : '';
  return user ? `${name}` : '';
};

const profileImage = () => {
  const user = Meteor.user();
  let imgSrc = '';
  if(user && user.services && user.services.facebook) {
    imgSrc = user.services.facebook.picture;
  }
  if(user && user.services && user.services.twitter) {
    imgSrc = user.services.twitter.profile_image_url;
  }
  if(user && user.services && user.services.google) {
    imgSrc = user.services.google.picture;
  }
  return imgSrc;
}

const AuthenticatedNavigationC = () => (
  <nav className="navigation-right" role="navigation">
    <ul>
      <li><img className="img-circle" src={ profileImage() } /></li>
      <li><a href="#">{ userName() }</a></li>
      <li><a href="#" className="button mdi mdi-logout" onClick={ handleLogout }><span>Logout</span></a></li>
    </ul>
  </nav>
);

export const AuthenticatedNavigation = createContainer(() => {
  const user = Meteor.user();
  return {
    user,
  }
}, AuthenticatedNavigationC);
