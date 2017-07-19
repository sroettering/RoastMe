import React, { Component } from 'react';

import { handleLogin } from '/imports/modules/accounts/login';

export class ModalLogin extends Component {

  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
  }

  login(event) {
    const service = event.target.getAttribute('data-social-login');
    handleLogin(service);
    this.props.closeModal();
  }

  render() {
    return (
      <div className="modal modal-login">
        <h2 className="modal-title">Login</h2>
        <button className="flat-button modal-close-btn" onClick={ this.props.closeModal }>
          &times;
        </button>
        <p>
          itsroastme's purpose is to roast you and other users.
          In order to create an account you have to 18+
        </p>
        <p className="center">Login in with</p>
        <button className="btn btn-facebook" data-social-login="loginWithNativeFacebook" onClick={this.login}>
          <i className="mdi mdi-facebook-box"></i> Facebook
        </button>
        <p className="center">or</p>
        <button className="btn btn-google" data-social-login="loginWithGoogle" onClick={this.login}>
          <i className="mdi mdi-google-plus-box"></i> Google+
        </button>
      </div>
    );
  }
}

ModalLogin.propTypes = {
  closeModal: React.PropTypes.func,
};
