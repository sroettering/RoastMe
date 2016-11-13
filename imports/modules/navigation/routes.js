import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';

import { App } from '/imports/modules/ui/app';
import { UserProfile } from '/imports/modules/accounts/user-profile';
import { Index } from '/imports/modules/ui/index.jsx';
import { Hot } from '/imports/modules/ui/hot';
import { Trending } from '/imports/modules/ui/trending';
import { New } from '/imports/modules/ui/new';
import { Login } from '/imports/modules/accounts/accounts-login';
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
  render(
    <Router history={ browserHistory }>
      <Route path="/" component={ App }>
        <IndexRoute name="hot" component={ Hot } />
        <Route name="trending" path="/trending" component={ Trending } />
        <Route name="new" path="/new" component={ New } />
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
