import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import AppNavigation from '/imports/modules/navigation/app-navigation';

export const AppC = React.createClass({
  propTypes: {
    children: React.PropTypes.element.isRequired,
    location: React.PropTypes.object,
  },
  render() {
    return <div>
      { this.props.children }
    </div>;
  },
});

export const App = createContainer(() => {
  Meteor.subscribe('loggedinUser');
  return {};
}, AppC);
