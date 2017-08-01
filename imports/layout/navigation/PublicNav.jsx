import React, { Component } from 'react';

import LoginModal from '/imports/layout/components/LoginModal';

export default class PublicNav extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
    }
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ isModalOpen: true });
  }

  closeModal() {
    this.setState({ isModalOpen: false });
  }

  render() {
    return (
      <nav className="navigation-right" role="navigation">
        <ul>
          <li>
            <button className="button mdi-mdi-login" onClick={ this.openModal }>
              Login
            </button>
          </li>
        </ul>
        <LoginModal isOpen={ this.state.isModalOpen } onClose={ this.closeModal } />
      </nav>
    );
  }
}
