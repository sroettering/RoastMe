import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Roasts } from '/imports/modules/roasts/roasts-collection';

export class DashboardC extends Component {

  handleRoast(accept) {
    const { roast } = this.props;
    if(!roast) return;
    if(accept) {
      Meteor.call('acceptRoast', roast._id);
    } else {
      Meteor.call('declineRoast', roast._id);
    }
  }

  render() {
    const { roast } = this.props;
    return (
      <main className="main admin-main">
        <div className="wrapper">
          <h2>Dashboard</h2>
          <img className="roast-image" src={ roast ? roast.imageUrl : '' } alt=""/>
          <button className="button mdi mdi-thumb-up" onClick={ this.handleRoast.bind(this, true) }>Accept</button>
          <button className="button mdi mdi-thumb-down" onClick={ this.handleRoast.bind(this, false) }>Decline</button>
        </div>
      </main>
    );
  }
}

DashboardC.propTypes = {
  user: React.PropTypes.object,
  roast: React.PropTypes.object,
};

export const Dashboard = createContainer(() => {
  const user = Meteor.user();
  const roastHandle = Meteor.subscribe('queued-roasts');
  const roast = Roasts.findOne();
  return {
    user,
    roast,
  };
}, DashboardC);
