import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

import ModalDialog from '/imports/layout/components/ModalDialog';

class LoginModal extends Component {
  
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  login(event) {
    const service = event.target.getAttribute('data-social-login');
    this.handleLogin(service);
    const { onClose } = this.props;
    if(onClose && typeof onClose === 'function') {
      onClose();
    }
  }

  handleLogin(service) {
    const options = {
      requestPermissions: [],
    };
    if (service === 'loginWithFacebook') {
      options.requestPermissions.push('email');
    }
    if (service === 'loginWithGoogle') {
      options.requestPermissions.push('https://www.googleapis.com/auth/plus.login');
      options.requestPermissions.push('https://www.googleapis.com/auth/userinfo.email');
    }
    Meteor[service](options, (error) => {
      if (error) {
        Bert.alert({
          title: "Whooops",
          message: "There was an error while logging you in!",
          type: "danger",
          icon: "fa fa-remove",
        });
      } else if (Meteor.user().services.google) {
        // We need to retrieve the age range of a user manually from google after first log in
        Meteor.call('addGoogleAgeRange');
      } else if (Meteor.user().services.facebook) {
        // We need to retrieve the url for the facebook image
        Meteor.call('addFacebookImage');
      }
      if (!error) {
        if (!Meteor.user().rulesAccepted || !Meteor.user().tosAccepted) {
          if(fbq) {
            fbq('track', 'CompleteRegistration', {
              value: 0,
              currency: 'EUR'
            });
          }
          this.props.history.push('/postSignup');
        } else {
          this.props.history.push('/');
        }
      }
    });
  }

  render() {
    const { isOpen, onOpen, onClose } = this.props;
    return (
      <ModalDialog isOpen={ isOpen } onClose={ onClose }>
        <div className="modal modal-login">
          <h2 className="modal-title">Login</h2>
          <button className="flat-button modal-close-btn" onClick={ onClose }>
            &times;
          </button>
          <p>
            itsroastme's purpose is to roast you and other users.
            In order to create an account you have to 18+
          </p>
          <p className="center">Login in with</p>
          <button className="btn btn-facebook" data-social-login="loginWithFacebook" onClick={ this.login }>
            <i className="mdi mdi-facebook-box"></i> Facebook
          </button>
          <p className="center">or</p>
          <button className="btn btn-google" data-social-login="loginWithGoogle" onClick={ this.login }>
            <i className="mdi mdi-google-plus-box"></i> Google+
          </button>
        </div>
      </ModalDialog>
    );
  }
}

export default withRouter(LoginModal);