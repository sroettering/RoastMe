import React, { Component } from 'react';
import Spinner from 'react-spinkit';

export class ModalUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filePath: "",
      loading: false,
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ filePath: "", loading: false });
  }

  changeListener(event) {
    this.setState({ loading: true });
    const reader = new FileReader();
    reader.readAsDataURL(this.fileInput.files[0]);
    reader.onloadend = (event) => {
      this.setState({ filePath: event.target.result, loading: false });
    }
  }

  render() {
    return (
      <div className="modal">
        <span className="modal-title">Upload your image</span>
        <hr />
        <label htmlFor="modal-input">Choose or drag image here</label>
        <div className="modal-upload">
          { this.state.loading ?
            <Spinner spinnerName="circle" className="dark" noFadeIn/> : <span className="mdi mdi-upload"></span>
          }
          <input
            id="modal-input"
            type="file"
            name="name"
            value=""
            ref={ (input) => this.fileInput = input }
            onChange={ this.changeListener.bind(this) }/>
          <img src={ this.state.filePath } />
        </div>
        <a href="#" className="button">Upload</a>
      </div>
    );
  }
}
