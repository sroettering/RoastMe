import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Roasts } from '/imports/modules/roasts/roasts-collection';
import { RoastVerificationPanel } from '/imports/modules/admin/roast-verification-panel';

export class DashboardC extends Component {
  render() {
    const { roast, numQueued } = this.props;
    return (
      <main className="main admin-main">
        <h2>Dashboard</h2>
        <RoastVerificationPanel roast={ roast } numQueued={ numQueued } />
      </main>
    );
  }
}

DashboardC.propTypes = {
  user: React.PropTypes.object,
  roast: React.PropTypes.object,
  numQueued: React.PropTypes.number,
};

export const Dashboard = createContainer(() => {
  const user = Meteor.user();
  const roastHandle = Meteor.subscribe('queued-roasts');
  const roast = Roasts.findOne();
  const numQueued = Roasts.find().count();
  return {
    user,
    roast,
    numQueued,
  };
}, DashboardC);
