import React from 'react';

export const PublicNavigation = () => (
  <header className="header" role="banner">
    <div className="wrapper">
      <a href="#" className="logo"></a>

      <nav className="navigation-left" role="navigation">
        <ul>
          <li><a href="#"><span className="badge">14</span>Hot</a></li>
          <li><a href="#" className="current">Trending</a></li>
          <li><a href="#">New</a></li>
        </ul>
      </nav>

      <nav className="navigation-right" role="navigation">
        <ul>
          <li><a href="#" className="mdi mdi-magnify"></a></li>
          <li><a href="#">Login</a></li>
          <li><a href="#" className="button">Sign up</a></li>
        </ul>
      </nav>
    </div>
  </header>
);
