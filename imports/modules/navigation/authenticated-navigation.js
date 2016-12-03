import React, { Component } from 'react';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { ModalDialog } from '/imports/modules/ui/modal-dialog';
import { ModalUpload } from '/imports/modules/roasts/upload';

const handleLogout = () => {
  Meteor.logout(() => browserHistory.push('/login'));
}

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
    this.setState({ isModalOpen: true });
  }

  closeModal() {
    this.setState({ isModalOpen: false });
  }

  modalCloseHandler(event) {
    const target = event.target;
    if(target.className === 'modal-overlay active') {
      this.closeModal();
    }
  }

  render() {
    const { user } = this.props;
    return (
      <nav className="navigation-right" role="navigation">
        <ul>
          <li><i className="mdi mdi-fire" onClick={ this.openModal.bind(this) }></i></li>
          <li>
            <Link to={ "/user/" + (user ? user._id : "") }>
              <img className="img-circle" src={ profileImage() } />
            </Link>
          </li>
          <li><a href="#" className="button mdi mdi-logout" onClick={ handleLogout }></a></li>
        </ul>
        <ModalDialog isOpen={ this.state.isModalOpen } closeHandler={ this.modalCloseHandler.bind(this) }>
          <ModalUpload />
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
