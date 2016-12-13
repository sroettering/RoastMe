import React from 'react';

export const NotFound = () => (
  <main className="main">
    <div className="wrapper">
      <p>
        <strong>Error [404]</strong>: { window.location.pathname } does not exist.
      </p>
    </div>
  </main>
);
