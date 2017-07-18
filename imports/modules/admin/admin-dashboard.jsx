import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Roasts } from '/imports/modules/roasts/roasts-collection';
import { RoastVerificationPanel } from '/imports/modules/admin/roast-verification-panel';
import SPE from '/imports/modules/accounts/social-property-extractor';

class DashboardC extends Component {
  render() {
    const { roast, numQueued, email, stats, statsReady } = this.props;
    return (
      <main className="main admin-main">
        <h2>Dashboard</h2>
        <RoastVerificationPanel roast={ roast } email={ email } numQueued={ numQueued } />
      </main>
    );
  }
}

DashboardC.propTypes = {
  currentUser: React.PropTypes.object,
  roast: React.PropTypes.object,
  email: React.PropTypes.string,
  numQueued: React.PropTypes.number,
};

export const Dashboard = createContainer(() => {
  const currentUser = Meteor.user();
  const users = Meteor.subscribe('user.all');
  const roastHandle = Meteor.subscribe('roasts.admin.queued');
  const roast = Roasts.findOne();
  const numQueued = Roasts.find().count();
  const roastOwner = roast ? Meteor.users.findOne({ _id: roast.userId }) : null;
  const email = SPE.getEmail(roastOwner);
  return {
    currentUser,
    roast,
    email,
    numQueued,
  };
}, DashboardC);
