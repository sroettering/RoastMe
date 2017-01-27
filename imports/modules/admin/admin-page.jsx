import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Roles } from 'meteor/alanning:roles';

import { NotFound } from '/imports/modules/ui/not-found';

class AdminPageC extends Component {

  render() {
    if(this.props.isAdmin) {
      return this.props.children;
    } else {
      return <NotFound />;
    }
  }
}

AdminPageC.propTypes = {
  children: React.PropTypes.element.isRequired,
  user: React.PropTypes.object,
  isAdmin: React.PropTypes.bool,
};

export const AdminPage = createContainer(() => {
  Meteor.subscribe('loggedinUser');
  const user = Meteor.user();
  return {
    user,
    isAdmin: user && Roles.userIsInRole(user, 'admin'),
  };
}, AdminPageC);
