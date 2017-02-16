import React, { Component } from 'react';
import classNames from 'classnames';
import EventListener from 'react-event-listener';

export const ModalDialog = ({ isOpen, closeHandler, children }) => {
  const classes = classNames({
    'modal-overlay': true,
    'active': isOpen,
  });
  return (
    <div className={ classes }  onClick={ closeHandler }>
      <EventListener target="window" onKeyUp={ closeHandler } />
      { children }
    </div>
  );
}
