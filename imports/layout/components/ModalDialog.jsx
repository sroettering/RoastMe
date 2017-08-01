import React, { Component } from 'react';
import EventListener from 'react-event-listener';

export default class ModalDialog extends Component {

  constructor(props) {
    super(props);
    this.onKey = this.onKey.bind(this);
  }

  onKey(event) {
    if(event && event.keyCode === 27) {
      const { onClose } = this.props;
      if(onClose && typeof onClose === 'function') {
        onClose();
      }
    }
  }

  render () {
    const { isOpen, onClose, children } = this.props;
    if(isOpen) {
      return (
        <div className="modal-overlay active" onClick={ onClose }>
          <EventListener target="window" onKeyUp={ this.onKey } />
          { children }
        </div>
      );
    } else {
      return null;
    }
  }
}