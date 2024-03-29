import React from 'react';
import { Link } from 'react-router';

export const Footer = (props) => {
  return (
    <footer className="footer" role="contentinfo">
      <div className="wrapper">
        <nav className="footer-navigation" role="navigation">
          <ul>
            <li><Link to="/rules">Rules</Link></li>
            <li><Link to ="/privacy">Privacy</Link></li>
            <li><Link to="/tos">Terms</Link></li>
            <li><Link to="/imprint">Imprint</Link></li>
          </ul>
        </nav>
        <div className="copyright">
          2016 © Roast Me. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
