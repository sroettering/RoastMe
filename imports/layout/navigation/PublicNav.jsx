import React, { Component } from 'react';
import EventListener from 'react-event-listener';

import { ModalDialog } from '/imports/modules/ui/modal-dialog';
import { ModalLogin } from '/imports/modules/ui/modal-login';

export default class PublicNav extends Component {

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
    return (
      <nav className="navigation-right" role="navigation">
        <ul>
          <li>
            <button className="button mdi-mdi-login" onClick={ this.openModal.bind(this) }>
              Login
            </button>
          </li>
        </ul>
        { this.state.isModalOpen ?
          <ModalDialog isOpen={ this.state.isModalOpen } closeHandler={ this.modalCloseHandler.bind(this) }>
            <EventListener target="window" onKeyUp={ this.handleKeyUp.bind(this) } />
            <ModalLogin closeModal={ this.closeModal.bind(this) }/>
          </ModalDialog>
        : '' } 
      </nav>
    );
  }
}
