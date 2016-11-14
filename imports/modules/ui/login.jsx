import React, { Component } from 'react';

import { ScrollHandler } from '/imports/modules/utility/scroll-handler';
import { handleLogin } from '/imports/modules/accounts/login';

export class Login extends Component {

  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
  }

  componentDidMount() {
    ScrollHandler.resetScrollPosition();
  }

  login(event) {
    const service = event.target.getAttribute('data-social-login');
    handleLogin(service);
  }

  render() {
    return (
      <div>
        <button className="btn btn-facebook" data-social-login="loginWithFacebook" onClick={this.login}>
          <i className="mdi mdi-facebook-box"></i> Sign in with Facebook
        </button>
        <button className="btn btn-google" data-social-login="loginWithGoogle" onClick={this.login}>
          <i className="mdi mdi-google-plus-box"></i> Sign in with Google+
        </button>
        <button className="btn btn-twitter" data-social-login="loginWithTwitter" onClick={this.login}>
          <i className="mdi mdi-twitter-box"></i> Sign in with Twitter
        </button>
      </div>
    );
  }

}
