import React from 'react';
import { Link } from 'react-router';

import { PublicNavigation } from './public-navigation';
import { AuthenticatedNavigation } from './authenticated-navigation';

import { ScrollHandler } from '/imports/modules/ui/scroll-handler';

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
        <div className="wrapper">
          <a href="#" className="logo"></a>

          <nav className="navigation-left" role="navigation">
            <ul>
              <li><Link to="/hot/" activeClassName="current">Hot</Link></li>
              <li><Link to="/login/" activeClassName="current">Trending</Link></li>
              <li><Link to="/new/" activeClassName="current">New</Link></li>
            </ul>
          </nav>

          {this.renderNavigation(this.props.hasUser)}
        </div>
      </header>
    );
  }
}

AppNavigation.propTypes = {
  hasUser: React.PropTypes.object,
};
