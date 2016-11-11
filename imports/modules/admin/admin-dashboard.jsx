import React, { Component } from 'react';

import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { UserStats } from '/imports/modules/admin/admin-collections.js';

const formatUserData = (doc) => {
  const data = {
    labels: doc.labels,
    datasets: [
      {
        label: 'Neue Nutzer',
        fill: true,
        pointRadius: 2,
        data: doc.userDeltas,
      },
    ],
  };
  return data;
};

const getChartOptions = () => {
  return {
    maintainAspectRatio: false,
    title: {
      display: true,
      text: 'Nutzerzuwachs',
      fontSize: 16,
    },
    legend: {
      display: false,
    },
    scales: {
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Datum',
        },
        gridLines: {
          display: false,
        },
        ticks: {
          maxRotation: 0,
        },
      }],
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Anzahl registrierte Nutzer',
        },
        ticks: {
          beginAtZero: true,
          suggestedMax: 10,
          maxTicksLimit: 10,
        },
      }],
    },
  };
};

export class DashboardC extends Component {
  render() {

  }
}

DashboardC.propTypes = {
  userData: React.PropTypes.object,
  chartOptions: React.PropTypes.object,
  userLoading: React.PropTypes.bool,
};

export const Dashboard = createContainer(() => {
  const historyLength = 10;
  const userStatsHandle = Meteor.subscribe('usersPerDay', historyLength);
  const userStats = UserStats.findOne();
  const userData = userStats ? formatUserData(UserStats.findOne()) : {};
  const chartOptions = getChartOptions();

  return {
    userLoading: !userStatsHandle.ready(),
    userData,
    chartOptions,
  };
}, DashboardC);
