import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { AppNavigation } from '/imports/modules/navigation/app-navigation';
import { Footer } from './footer';

export class AppC extends Component {

  render() {
    const { children, currentUser, location } = this.props;
    const clonedChildren = React.Children.map(children, (child) => {
      return React.cloneElement(child, { currentUser });
    });
    const path = location.pathname;
    const sidebarVisible = false;//path !== '/postSignup';
    return (
      <div>
        <AppNavigation hasUser={ !!Meteor.userId() }/>
        <main className="main" role="main">
          <div className="wrapper">
            <div className="content">
              { clonedChildren }
            </div>
            { sidebarVisible ? <div className="sidebar"></div> : '' }
          </div>
        </main>
        <Footer />
      </div>
    );
  }
}

AppC.propTypes = {
  children: React.PropTypes.element.isRequired,
  location: React.PropTypes.object,
  currentUser: React.PropTypes.object,
};

export const App = createContainer(() => {
  Meteor.subscribe('loggedinUser');
  const currentUser = Meteor.user();
  return {
    currentUser,
  };
}, AppC);
