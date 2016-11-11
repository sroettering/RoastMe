import React from 'react';

import { handleLogin } from '/imports/modules/accounts/login.js';

export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
  }

  login(event) {
    const service = event.target.getAttribute('data-social-login');
    handleLogin(service);
  }

  render() {
    return
        <form ref="login" className="login">
        </form>
  }
}
