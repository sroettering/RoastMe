import React from 'react';
import { Link } from 'react-router';

export const PublicNavigation = () => (
  <nav className="navigation-right" role="navigation">
    <ul>
      <li><Link to="/login" className="button mdi mdi-login"><span>Login</span></Link></li>
    </ul>
  </nav>
);
