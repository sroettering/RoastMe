import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { AppNavigation } from '/imports/modules/navigation/app-navigation';
import { Footer } from './footer';

// TODO: Add footer beneath main tag

export class AppC extends Component {

  render() {
    return (
      <div>
        <AppNavigation hasUser={ !!Meteor.userId() }/>
        <main className="main" role="main">
          <div className="wrapper">
            <div className="content">
              { this.props.children }
            </div>
            <div className="sidebar">
              SEITENSPALTE
            </div>
          </div>
        </main>

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
