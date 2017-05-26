import React, { Component } from 'react';
import Spinner from 'react-spinkit';
import loadImage from 'blueimp-load-image';

import ImageUpload from '/imports/modules/roasts/img-upload';

export class ModalUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      uploadEnabled: false,
      uploading: false,
    }
    this.rotateRight = this.rotateRight.bind(this);
    this.rotateLeft = this.rotateLeft.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ loading: false, uploadEnabled: false, uploading: false });
    this.imgElement.src = "";
    this.image = undefined;
    this.ctx = undefined;
    this.imgWidth = 0;
    this.imgHeight = 0;
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
    loadImage.parseMetaData(this.image, (data) => {
      const orientation = data.exif && data.exif.get('Orientation') || true;
      loadImage(this.image, (canvas, meta) => {
        if(canvas.type === 'error') {
          Bert.alert({
            title: "Whoops",
            message: `Something went wrong while loading your image`,
            type: "warning",
            icon: "fa fa-info",
          });
        } else {
          // this.ctx = canvas.getContext('2d');
          // this.imgWidth = canvas.width;
          // this.imgHeight = canvas.height;
          this.imgElement.src = canvas.toDataURL();
          this.setState({ loading: false, uploadEnabled: true });
        }
      }, {
        maxWidth: 800,
        maxHeight: 800,
        orientation: orientation
      });
    }, {});
  }

  rotateRight() {
    this.ctx.canvas.width = this.imgHeight;
    this.ctx.canvas.height = this.imgWidth;
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctx.translate(this.ctx.canvas.width / 2, this.ctx.canvas.height / 2);
    this.ctx.rotate(Math.PI / 2);
    this.ctx.drawImage(this.imgElement, -this.imgWidth/2, -this.imgHeight/2);
    this.imgElement.src = this.ctx.canvas.toDataURL();
    this.imgWidth = this.ctx.canvas.width;
    this.imgHeight = this.ctx.canvas.height;
  }

  rotateLeft() {
    this.ctx.canvas.width = this.imgHeight;
    this.ctx.canvas.height = this.imgWidth;
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctx.translate(this.ctx.canvas.width / 2, this.ctx.canvas.height / 2);
    this.ctx.rotate(-Math.PI / 2);
    this.ctx.drawImage(this.imgElement, -this.imgWidth/2, -this.imgHeight/2);
    this.imgElement.src = this.ctx.canvas.toDataURL();
    this.imgWidth = this.ctx.canvas.width;
    this.imgHeight = this.ctx.canvas.height;
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
          _.delay(notification, 250);
        }
        _.delay(this.props.closeModal, 600);
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
        <p className="roast-warning"><span className="exclamation-mark">!</span>We can only accept your picture if you hold up a paper saying "#Roast Me"!</p>
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
