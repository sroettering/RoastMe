import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { AppNavigation } from '/imports/modules/navigation/app-navigation';
import { Footer } from './footer';
import { Notifications } from '/imports/modules/notifications/notifications-collection';

export class AppC extends Component {

  componentDidUpdate() {
    const { notifications } = this.props;
    // there should only be one notification
    notifications.forEach(noti => {
      Bert.defaults.hideDelay = 6000;
      Bert.alert({
        type: noti.type,
        style: 'fixed-bottom',
        title: noti.title,
        message: noti.message,
        icon: noti.icon,
      });
      Meteor.setTimeout(function(){
        Meteor.call('readNotification', noti._id);
        Bert.defaults.hideDelay = 3500;
      }, Bert.defaults.hideDelay);
    });
  }

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
  notifications: React.PropTypes.array,
};

export const App = createContainer(() => {
  Meteor.subscribe('user.current');
  const notificationHandle = Meteor.subscribe('notification.unread');
  const notifications = Notifications.find().fetch();
  const currentUser = Meteor.user();
  return {
    currentUser,
    notifications,
  };
}, AppC);
