import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

import withNotifications from '/imports/decorators/withNotifications';
import SecuredRoute from '/imports/logic/SecuredRoute';
import Navigation from '/imports/layout/navigation/Navigation.jsx';
import Footer from '/imports/layout/navigation/Footer';
import IntroPage from '/imports/pages/IntroPage';
//import { Trending } from '/imports/modules/ui/trending';

@withNotifications
export default class MainLayout extends React.Component {
  componentDidUpdate() {
    const { notifications } = this.props;
    // there should only be one notification
    notifications.forEach(popNotification);
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Navigation />
          <main className="main" role="main">
            <div className="wrapper">
              <div className="content">
                 <Switch>
                  <SecuredRoute path='/postSignup' component={ IntroPage } role='admin' /> 
                </Switch> 
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

const popNotification = (notification) => {
  Bert.defaults.hideDelay = 6000;
  Bert.alert({
    type: notification.type,
    style: 'fixed-bottom',
    title: notification.title,
    message: notification.message,
    icon: notification.icon,
  });
  Meteor.setTimeout(function(){
    Meteor.call('readNotification', notification._id);
    Bert.defaults.hideDelay = 3500;
  }, Bert.defaults.hideDelay);
};