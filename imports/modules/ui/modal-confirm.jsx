import React from 'react';

export const ModalConfirm = ({ onSubmit, onCancel, title, confirmText }) =>
  <div className="modal">
    <h2 className="modal-title">{ title }</h2>
    <button className="flat-button modal-close-btn" onClick={ onCancel }>
      &times;
    </button>
    <div className="modal-confirm">
      <p>{ confirmText }</p>
    </div>
    <button
      className="button"
      onClick={ onSubmit }>Do it!</button>
    <button
      className="flat-button"
      onClick={ onCancel }>Cancel</button>
  </div>
