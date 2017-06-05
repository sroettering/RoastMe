import React from 'react';
import { Link, IndexLink } from 'react-router';

import { PublicNavigation } from './public-navigation';
import { AuthenticatedNavigation } from './authenticated-navigation';

import { ScrollHandler } from '/imports/modules/utility/scroll-handler';

export class AppNavigation extends React.Component {
  renderNavigation(hasUser) {
    return hasUser ? <AuthenticatedNavigation /> : <PublicNavigation />;
  }

  componentDidMount() {
    window.addEventListener('scroll', ScrollHandler.handleScrollEvent);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', ScrollHandler.handleScrollEvent);
  }

  render() {
    return (
      <header className="header" role="banner">
        <a href="#" className="logo"></a>
        <IndexLink to="/" className="logo" />

        <nav className="navigation-left" role="navigation">
          <ul>
            <li><IndexLink to="/" activeClassName="current">New</IndexLink></li>
            <li><Link to="/trending/" activeClassName="current">Trending</Link></li>
            {/*
            <li><Link to="/hot/" activeClassName="current">Hot</Link></li>
            */}
          </ul>
        </nav>

        {this.renderNavigation(this.props.hasUser)}
      </header>
    );
  }
}

AppNavigation.propTypes = {
  hasUser: React.PropTypes.bool,
};
