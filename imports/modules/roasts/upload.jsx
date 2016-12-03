import React, { Component } from 'react';

export class ModalUpload extends Component {
  render() {
    return (
      <div className="modal">
        <span className="modal-title">Upload your image</span>
        <hr />
        <label htmlFor="modal-input">Choose or drag image here</label>
        <div className="modal-upload">
          <span className="mdi mdi-upload"></span>
          <input id="modal-input" type="file" name="name" value="" />
        </div>
        <a href="#" className="button">Upload</a>
      </div>
    );
  }
}
