import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import withUser from '/imports/decorators/withUser';
import PublicNav from './PublicNav';
import AuthenticatedNav from './AuthenticatedNav';
import ScrollListener from '/imports/util/ScrollListener';

@withUser
export default class Navigation extends React.Component {

  handleScroll(position, lastPosition) {
    document.getElementsByClassName('header')[0].classList.toggle('fixed', position > lastPosition);
  }

  render() {
    const { user } = this.props;
    return (
      <header className="header" role="banner">
        <ScrollListener listener={ this.handleScroll.bind(this) } />
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
