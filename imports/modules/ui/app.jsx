import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { AppNavigation } from '/imports/modules/navigation/app-navigation';

export class AppC extends Component {

  render() {
    return (
      <div>
        <AppNavigation />
        { this.props.children }
      </div>
    );
  }
}

AppC.propTypes = {
  children: React.PropTypes.element.isRequired,
  location: React.PropTypes.object,
};

export const App = createContainer(() => {
  Meteor.subscribe('loggedinUser');
  return {};
}, AppC);
