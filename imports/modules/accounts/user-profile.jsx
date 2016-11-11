import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

class UserProfileC extends Component {

  render() {

  }
}

UserProfileC.propTypes = {
  profile: React.PropTypes.object,
  loading: React.PropTypes.bool,
};

export const UserProfile = createContainer(({ params }) => {
  const userHandle = Meteor.subscribe('user', params.id);
  const loading = !userHandle.ready();
  const user = Meteor.users.findOne(params.id);
  const profile = {};
  if (user && user.services && user.services.google) {
    profile.name = user.profile.name;
    profile.age_range = user.services.google.age_range;
    profile.picture = user.services.google.picture;
    profile.gender = user.services.google.gender === 'male' ? 'Männlich' : 'Weiblich';
  } else if (user && user.services && user.services.facebook) {
    profile.name = user.profile.name;
    profile.age_range = user.services.facebook.age_range;
    profile.picture = user.services.facebook.picture;
    profile.gender = user.services.facebook.gender === 'male' ? 'Männlich' : 'Weiblich';
  }
  return {
    loading,
    profile,
  };
}, UserProfileC);
