import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import withUser from '/imports/decorators/withUser';
import PublicNav from './PublicNav';
import AuthenticatedNav from './AuthenticatedNav';

import { ScrollHandler } from '/imports/modules/utility/scroll-handler';

@withUser
export default class Navigation extends React.Component {
  componentDidMount() {
    window.addEventListener('scroll', ScrollHandler.handleScrollEvent);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', ScrollHandler.handleScrollEvent);
  }

  render() {
    const { user } = this.props;
    return (
      <header className="header" role="banner">
        <NavLink to="/" className="logo" />

        <nav className="navigation-left" role="navigation">
          <ul>
            {/*
            <li><Link to="/hot/" activeClassName="current">Hot</Link></li>
            */}
            <li><NavLink to="/" activeClassName="current">Trending</NavLink></li>
            <li><NavLink to="/new" activeClassName="current">New</NavLink></li>
          </ul>
        </nav>

        { !!user ? <AuthenticatedNav /> : <PublicNav /> }
      </header>
    );
  }
}
