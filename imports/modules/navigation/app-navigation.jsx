import React from 'react';
import { Link } from 'react-router';
import { PublicNavigation } from './public-navigation';
import { AuthenticatedNavigation } from './authenticated-navigation';

export class AppNavigation extends React.Component {
  renderNavigation(hasUser) {
    return hasUser ? <AuthenticatedNavigation /> : <PublicNavigation />;
  }

  render() {
    return this.renderNavigation(this.props.hasUser);
  }
}

AppNavigation.propTypes = {
  hasUser: React.PropTypes.object,
};
