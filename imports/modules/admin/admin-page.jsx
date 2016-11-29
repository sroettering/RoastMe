import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { NotFound } from '/imports/modules/ui/not-found';

class AdminPageC extends Component {

  componentWillReceiveProps(nextProps) {
    const { isAdmin } = nextProps;
    const { user } = nextProps;
    if(!isAdmin && user) {
      browserHistory.push('/');
    }
  }

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
    user: Meteor.user(),
    isAdmin: user && Roles.userIsInRole(user, 'admin'),
  };
}, AdminPageC);
