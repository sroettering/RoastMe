import React from 'react';

export const Footer = (props) => {
  return (
    <footer className="footer" role="contentinfo">
      <div className="wrapper">
        <nav className="footer-navigation" role="navigation">
          <ul>
            <li><a href="#">Contact</a></li>
            <li><a href="#">Privacy</a></li>
            <li><a href="#">Terms</a></li>
            <li><a href="#">Imprint</a></li>
          </ul>
        </nav>
        <div className="copyright">
          2016 © Roast Me. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
