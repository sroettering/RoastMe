import React, { Component } from 'react';
import classNames from 'classnames';

export const ModalDialog = ({ isOpen, closeHandler, children }) => {
  const classes = classNames({
    'modal-overlay': true,
    'active': isOpen,
  });
  return (
    <div className={ classes }  onClick={ closeHandler }>
      { children }
    </div>
  );
}
