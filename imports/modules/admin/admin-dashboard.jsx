import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Roasts } from '/imports/modules/roasts/roasts-collection';
import { RoastVerificationPanel } from '/imports/modules/admin/roast-verification-panel';

class DashboardC extends Component {
  render() {
    const { roast, numQueued } = this.props;
    return (
      <main className="main admin-main">
        <h2>Roastme Dashboard</h2>
        <RoastVerificationPanel roast={ roast } numQueued={ numQueued } />
      </main>
    );
  }
}

DashboardC.propTypes = {
  currentUser: React.PropTypes.object,
  roast: React.PropTypes.object,
  numQueued: React.PropTypes.number,
};

export const Dashboard = createContainer(() => {
  const currentUser = Meteor.user();
  const users = Meteor.subscribe('user.all');
  const roastHandle = Meteor.subscribe('queued-roasts');
  const roast = Roasts.findOne();
  const numQueued = Roasts.find().count();
  return {
    currentUser,
    roast,
    numQueued,
  };
}, DashboardC);
