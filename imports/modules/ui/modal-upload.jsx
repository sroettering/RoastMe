import React, { Component } from 'react';
import Spinner from 'react-spinkit';

import ImageUpload from '/imports/modules/roasts/img-upload';

export class ModalUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      uploadEnabled: false,
      uploading: false,
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ loading: false, uploadEnabled: false, uploading: false });
    this.imgElement.src = "";
    this.image = undefined;
    this.title.value = '';
  }

  changeListener(event) {
    this.setState({ loading: true });
    this.image = event.target.files[0];
    if(this.image.type !== 'image/png' && this.image.type !== 'image/jpeg') {
      Bert.alert({
        title: "Wrong image format",
        message: `image type ${this.image.type} is not supported`,
        type: "warning",
        icon: "fa fa-info",
      });
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(this.image);
    reader.onloadend = (event) => {
      this.imgElement.src = event.target.result;
      this.setState({ loading: false, uploadEnabled: true });
    }
  }

  uploadImg(event) {
    if(this.image && this.title.value) {
      this.setState({ uploading: true })
      ImageUpload(this.image, this.imgElement, this.title.value, (error, roastId) => {
        if(roastId) {
          const notification = () => Bert.alert({
            title: "Upload complete",
            message: "Your image will be analyzed soon",
            type: "success",
            icon: "fa fa-check",
          });
          _.delay(notification, 500);
          _.delay(this.props.closeModal, 600);
        }
        this.setState({ uploading: false });
      });
    } else {
      Bert.alert({
        title: "Not like that!",
        message: "Title or image is missing!",
        type: "warning",
        icon: "fa fa-info",
      });
    }
  }

  render() {
    return (
      <div className="modal">
        <h2 className="modal-title">Get roasted</h2>
        <button className="flat-button modal-close-btn" onClick={ this.props.closeModal }>
          &times;
        </button>
        <label htmlFor="title-input">Enter a roast title</label>
        <input
          id="title-input"
          type="text"
          className="roast-title"
          placeholder="Roast me please..."
          ref={ input => this.title = input}/>
        <label htmlFor="image-input">Laugh at yourself first, before anyone else can</label>
        <div className="modal-upload">
          { this.state.loading ?
            <Spinner spinnerName="circle" className="preview-spinner dark" noFadeIn/> : <span className="drop-area mdi mdi-upload"></span>
          }
          <input
            id="image-input"
            type="file"
            accept=".jpg,.jpeg,.png"
            name="name"
            value=""
            onChange={ this.changeListener.bind(this) }/>
          <img src="" ref={ img => this.imgElement = img } />
        </div>
        <button
          className="button flame-button"
          onClick={ this.uploadImg.bind(this) }
          disabled={ !this.state.uploadEnabled }>Roast me!</button>
        { this.state.uploading ?
          <Spinner spinnerName="circle" className="upload-spinner dark" noFadeIn/> : ''
        }
      </div>
    );
  }
}

ModalUpload.propTypes = {
  closeModal: React.PropTypes.func,
};
