import React, { Component } from 'react';
import { browserHistory } from 'react-router';

import { ScrollHandler } from '/imports/modules/utility/scroll-handler';
import { handleLogin } from '/imports/modules/accounts/login';

export class Login extends Component {

  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
  }

  componentDidMount() {
    ScrollHandler.resetScrollPosition();
    if(Meteor.userId()) {
      browserHistory.push("/");
    }
  }

  login(event) {
    const service = event.target.getAttribute('data-social-login');
    handleLogin(service);
  }

  render() {
    return (
      <div>
        <p>
          Welcome to Roast me Good!

          This site's purpose is to verbally roast uploaded images from you and other users.
          By registering you have to be fully aware of this fact!
        </p>
        <button className="btn btn-facebook" data-social-login="loginWithFacebook" onClick={this.login}>
          <i className="mdi mdi-facebook-box"></i> Sign in with Facebook
        </button>
        <button className="btn btn-google" data-social-login="loginWithGoogle" onClick={this.login}>
          <i className="mdi mdi-google-plus-box"></i> Sign in with Google+
        </button>
      </div>
    );
  }

}
