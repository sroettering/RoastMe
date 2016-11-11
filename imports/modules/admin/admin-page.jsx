import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { isAdmin } from '/imports/modules/accounts/role-helpers.js';

class AdminPageC extends Component {
  render() {

  }
}

AdminPageC.propTypes = {
  children: React.PropTypes.element.isRequired,
  isAdmin: React.PropTypes.bool,
  user: React.PropTypes.object,
};

export const AdminPage = createContainer(() => (
  {
    isAdmin: isAdmin(),
    user: Meteor.user(),
  }
), AdminPageC);
