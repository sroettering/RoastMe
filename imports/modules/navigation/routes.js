import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

import { App } from '/imports/modules/ui/app';
import { UserProfile } from '/imports/modules/accounts/user-profile';
import { Index } from '/imports/modules/ui/index.jsx';
import { Hot } from '/imports/modules/ui/hot';
import { Trending } from '/imports/modules/ui/trending';
import { New } from '/imports/modules/ui/new';
import { RoastPage } from '/imports/modules/ui/roast-page';
import { Login } from '/imports/modules/ui/login';
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

const requireAdmin = (nextState, replace) => {
  if (!Meteor.loggingIn() && !Meteor.userId()) {
    if(!Roles.userIsInRole(Meteor.userId())) {
      replace({
        pathname: '/',
        state: { nextPathname: '/' },
      });
    }
  }
};

Meteor.startup(() => {
  render(
    <Router history={ browserHistory }>
      <Route path="/" component={ App }>
        <IndexRoute name="hot" component={ Hot } />
        <Route name="trending" path="/trending" component={ Trending } />
        <Route name="new" path="/new" component={ New } />
        <Route name="roast" path="/roast/:id" component={ RoastPage } />
        <Route name="login" path="/login" component={ Login } />
        <Route name="user" path="/user/:id" component={ UserProfile } onEnter={ requireAuth } />
        <Route name="admin-page" path="/admin" component={ AdminPage } onEnter={ requireAuth }>
          <IndexRoute name="admin-dashboard" component={ Dashboard } />
        </Route>
        <Route path="*" component={ NotFound } />
      </Route>
    </Router>,
    document.getElementById('react-root')
  );
});
