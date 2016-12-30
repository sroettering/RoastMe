import React, { Component } from 'react';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import EventListener from 'react-event-listener';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { ReactiveVar } from 'meteor/reactive-var';

import { ModalDialog } from '/imports/modules/ui/modal-dialog';
import { ModalUpload } from '/imports/modules/ui/modal-upload';

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

  handleKeyUp(event) {
    console.log(event.keyCode);
    if(event.keyCode === 27) {
      this.closeModal();
    }
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
          <li><i className="icon-upload big" onClick={ this.openModal.bind(this) }></i></li>
          <li>
            <Link to={ "/user/" + (user ? user._id : "") }>
              <img className="img-circle" src={ profileImage() } />
            </Link>
          </li>
        </ul>
        { this.state.isModalOpen ?
        <ModalDialog isOpen={ this.state.isModalOpen } closeHandler={ this.modalCloseHandler.bind(this) }>
          <EventListener target="window" onKeyUp={ this.handleKeyUp.bind(this) } />
          <ModalUpload closeModal={ this.closeModal.bind(this) }/>
        </ModalDialog>
        : '' }
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
