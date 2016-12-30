import React, { Component } from 'react';
import Spinner from 'react-spinkit';

import ImageUpload from '/imports/modules/roasts/img-upload';

export class ModalUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      uploadEnabled: false,
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ loading: false, uploadEnabled: false });
    this.imgElement.src = "";
    this.image = undefined;
    this.title.value = '';
  }

  changeListener(event) {
    this.setState({ loading: true });
    this.image = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.image);
    reader.onloadend = (event) => {
      this.imgElement.src = event.target.result;
      this.setState({ loading: false, uploadEnabled: true });
    }
  }

  uploadImg(event) {
    if(this.image && this.title.value) {
      ImageUpload(this.image, this.imgElement, this.title.value, (roastId) => {
        if(roastId) {
          const notification = () => Bert.alert({
            title: "Upload complete",
            message: "Your image will be analyzed soon",
            type: "success",
            icon: "fa fa-check",
          });
          _.delay(notification, 500);
        }
        _.delay(this.props.closeModal, 600);
      });
    } else {
      Bert.alert({
        title: "Sorry!",
        message: "Heading is missing!",
        type: "warning",
        icon: "fa fa-info",
      });
    }
  }

  render() {
    return (
      <div className="modal">
        <span className="roast-title">Upload your image</span>
        <hr />
        <input
          type="text"
          className="roast-title"
          placeholder="Roast Heading..."
          ref={ input => this.title = input}/>
        <label htmlFor="modal-input">Choose or drag image here</label>
        <div className="modal-upload">
          { this.state.loading ?
            <Spinner spinnerName="circle" className="dark" noFadeIn/> : <span className="drop-area mdi mdi-upload"></span>
          }
          <input
            id="modal-input"
            type="file"
            accept=".jpg,.jpeg,.png"
            name="name"
            value=""
            onChange={ this.changeListener.bind(this) }/>
          <img src="" ref={ img => this.imgElement = img } />
        </div>
        <button
          className="button mdi mdi-check"
          onClick={ this.uploadImg.bind(this) }
          disabled={ !this.state.uploadEnabled }>Roast me!</button>
      </div>
    );
  }
}

ModalUpload.propTypes = {
  closeModal: React.PropTypes.func,
};
