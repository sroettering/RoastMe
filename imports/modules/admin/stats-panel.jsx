import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { LineChart, XAxis, YAxis, Line, Legend } from 'recharts';
import Loading from '/imports/modules/ui/loading';

import { Stats } from '/imports/modules/admin/admin-collections';

const data = [
  { period: 'KW 4', value: 100 },
  { period: 'KW 5', value: 105 },
  { period: 'KW 6', value: 112 },
];

class StatsPanelC extends Component {

  render() {
    const { ready, stats } = this.props;
    if (ready) {
      const { totalUsers, totalRoasts, totalComments } = stats;
      return (
        <div className="dashboard-panel stats-panel">
          <div className="overview-container">
            <div className="overview-block">
              <span>Users</span>
              <p>{ totalUsers }</p>
            </div>
            <div className="overview-block">
              <span>Uploads</span>
              <p>{ totalRoasts }</p>
            </div>
            <div className="overview-block">
              <span>Roasts</span>
              <p>{ totalComments }</p>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="dashboard-panel stats-panel">
          <Loading />
        </div>
      );
    }
  }

}

StatsPanelC.propTypes = {
  ready: React.PropTypes.bool,
  stats: React.PropTypes.object,
};

export const StatsPanel = createContainer(() => {
  const statsHandle = Meteor.subscribe('admin.stats');
  const stats = Stats.findOne();
  return {
    ready: statsHandle.ready(),
    stats
  };
}, StatsPanelC);

/*
<div className="chart-container">
  <LineChart width={600} height={300} data={data}>
    <XAxis dataKey="name" />
    <YAxis />
    <Legend />
    <Line type="monotone" dataKey="value" />
  </LineChart>
</div>
*/
