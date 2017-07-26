import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Switch, Route } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

import withNotifications from '/imports/decorators/withNotifications';
import SecuredRoute from '/imports/util/SecuredRoute';
import Navigation from '/imports/layout/navigation/Navigation.jsx';
import Footer from '/imports/layout/navigation/Footer';
import IntroPage from '/imports/layout/pages/IntroPage';
import Imprint from '/imports/layout/pages/Imprint';
import TermsOfService from '/imports/layout/pages/TermsOfService';
import PrivacyStatement from '/imports/layout/pages/PrivacyStatement';
import RoastFeed from '/imports/layout/pages/RoastFeed';

@withNotifications
export default class MainLayout extends React.Component {
  componentDidUpdate() {
    const { notifications } = this.props;
    // there should only be one notification
    notifications.forEach(popNotification);
  }

  render() {
    return (
      <Router>
        <div>
          <Navigation />
          <main className="main" role="main">
            <div className="wrapper">
              <div className="content">
                <Switch>
                  <Route exact path='/' render={ (props) => <RoastFeed category='new' {...props} /> } />
                  <SecuredRoute path='/postSignup' component={ IntroPage } />
                  <Route path='/rules' component={ Rules } />
                  <Route path='/privacy' component={ PrivacyStatement } />
                  <Route path='/tos' component={ TermsOfService } />
                  <Route path='/imprint' component={ Imprint } />
                </Switch> 
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </Router>
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