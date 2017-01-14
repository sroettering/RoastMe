import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { moment } from 'meteor/momentjs:moment';

import { App } from '/imports/modules/ui/app';
import { UserProfile } from '/imports/modules/accounts/user-profile';
import { Index } from '/imports/modules/ui/index.jsx';
import { Hot } from '/imports/modules/ui/hot';
import { Trending } from '/imports/modules/ui/trending';
import { New } from '/imports/modules/ui/new';
import { RoastPage } from '/imports/modules/ui/roast-page';
import { Login } from '/imports/modules/ui/login';
import { IntroPage } from '/imports/modules/accounts/intro-page';
import { Rules } from '/imports/modules/accounts/rules';
import { TermsOfService } from '/imports/modules/ui/terms-of-service';
import { Imprint } from '/imports/modules/ui/imprint';
import { PrivacyStatement } from '/imports/modules/ui/privacy-statement';
import { AdminPage } from '/imports/modules/admin/admin-page';
import { Dashboard } from '/imports/modules/admin/admin-dashboard';
import { NotFound } from '/imports/modules/ui/not-found.jsx';

const requireAuth = (nextState, replace) => {
  if (!Meteor.loggingIn() && !Meteor.userId()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname },
    });
  }
};

Meteor.startup(() => {
  Session.set('now', moment().toObject());
  Meteor.setInterval(() => {
    Session.set('now', moment().toObject());
  }, 20000);
  render(
    <Router history={ browserHistory }>
      <Route path="/" component={ App }>
        <IndexRoute name="hot" component={ Hot } />
        <Route name="trending" path="/trending" component={ Trending } />
        <Route name="new" path="/new" component={ New } />
        <Route name="roast" path="/roast/:id" component={ RoastPage } />
        <Route name="login" path="/login" component={ Login } />
        <Route name="postSignup" path="/postSignup" component={ IntroPage } onEnter={requireAuth} />
        <Route name="rules" path="/rules" component={ Rules } onEnter={requireAuth} />
        <Route name="termsOfService" path="/tos" component={ TermsOfService } />
        <Route name="privacy" path="/privacy" component={ PrivacyStatement } />
        <Route name="imprint" path="/imprint" component={ Imprint } />
        <Route name="user" path="/user/:id" component={ UserProfile } onEnter={ requireAuth } />
      </Route>
      <Route name="admin-page" path="/admin" component={ AdminPage } onEnter={ requireAuth }>
        <IndexRoute name="admin-dashboard" component={ Dashboard } />
      </Route>
      <Route path="*" component={ NotFound } />
    </Router>,
    document.getElementById('react-root')
  );
});
