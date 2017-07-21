import React, { Component } from 'react';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { ReactiveVar } from 'meteor/reactive-var';

import { ModalDialog } from '/imports/modules/ui/modal-dialog';
import { ModalUpload } from '/imports/modules/ui/modal-upload';

const profileImage = () => {
  const user = Meteor.user();
  let imgSrc = '';
  if(user && user.services && user.services.facebook) {
    imgSrc = user.services.facebook.picture;
  }
  if(user && user.services && user.services.twitter) {
    imgSrc = user.services.twitter.profile_image_url;
  }
  if(user && user.services && user.services.google) {
    imgSrc = user.services.google.picture;
  }
  return imgSrc;
}

class AuthenticatedNavigationC extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
    }
  }

  openModal() {
    const { user } = this.props;
    if(user && (!user.rulesAccepted || !user.tosAccepted)) {
      browserHistory.push('/postSignup');
    } else {
      this.setState({ isModalOpen: true });
    }
  }

  closeModal() {
    this.setState({ isModalOpen: false });
  }

  handleKeyUp(event) {

  }

  modalCloseHandler(event) {
    const target = event.target;
    if(target && target.className === 'modal-overlay active') {
      this.closeModal();
    }
    if(event.keyCode === 27) {
      this.closeModal();
    }
  }

  render() {
    const { user } = this.props;
    return (
      <nav className="navigation-right" role="navigation">
        <ul>
          <li><i className="icon-upload big" onClick={ this.openModal.bind(this) }></i></li>
          <li>
            <Link to={ "/user/" + (user ? user._id : "") } rel='nofollow'>
              <img className="img-circle" src={ profileImage() } />
            </Link>
          </li>
        </ul>
        <ModalDialog isOpen={ this.state.isModalOpen } closeHandler={ this.modalCloseHandler.bind(this) }>
          <ModalUpload closeModal={ this.closeModal.bind(this) }/>
        </ModalDialog>
      </nav>
    );
  }
}

export const AuthenticatedNavigation = createContainer(() => {
  const user = Meteor.user();
  return {
    user,
  }
}, AuthenticatedNavigationC);
