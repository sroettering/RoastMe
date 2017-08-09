import React, { Component } from 'react';
import Spinner from 'react-spinkit';
import loadImage from 'blueimp-load-image';

import ModalDialog from '/imports/layout/components/ModalDialog';
import ImageUpload from '/imports/modules/roasts/img-upload';

export default class UploadModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      uploadEnabled: false,
      uploading: false,
    }
    this.changeListener = this.changeListener.bind(this);
    this.uploadImg = this.uploadImg.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ loading: false, uploadEnabled: false, uploading: false });
  }

  changeListener(event) {
    this.setState({ loading: true });
    this.imageFile = event.target.files[0];
    if(this.imageFile.type !== 'image/png' && this.imageFile.type !== 'image/jpeg') {
      Bert.alert({
        title: "Wrong image format",
        message: `image type ${this.imageFile.type} is not supported`,
        type: "warning",
        icon: "fa fa-info",
      });
      return;
    }
    loadImage.parseMetaData(this.imageFile, (data) => {
      const orientation = data.exif && data.exif.get('Orientation') || true;
      loadImage(this.imageFile, (canvas, meta) => {
        if(canvas.type === 'error') {
          Bert.alert({
            title: "Whoops",
            message: `Something went wrong while loading your image`,
            type: "warning",
            icon: "fa fa-info",
          });
        } else {
          this.imgElement.src = canvas.toDataURL();
          canvas.toBlob((blob) => {
            blob.name = this.imageFile.name.replace(/ /g, '_');
            this.image = blob;
          });
          this.setState({ loading: false, uploadEnabled: true });
        }
      }, {
        maxWidth: 800,
        maxHeight: 800,
        orientation: orientation
      });
    }, {});
  }

  uploadImg(event) {
    if(this.imageFile && this.title.value) {
      this.setState({ uploading: true })
      ImageUpload(this.image, this.title.value, (error, roastId) => {
        if(roastId) {
          const notification = () => Bert.alert({
            title: "Upload complete",
            message: "Your image will be analyzed soon",
            type: "success",
            icon: "fa fa-check",
          });
          _.delay(notification, 250);
        }
        _.delay(this.props.onClose, 600);
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
    const { isOpen, onClose } = this.props;
    return (
      <ModalDialog isOpen={ isOpen } onClose={ onClose }>
        <div className="modal" onClick={ event => event.stopPropagation() }>
          <h2 className="modal-title">Get roasted</h2>
          <button className="flat-button modal-close-btn" onClick={ onClose }>
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
              onChange={ this.changeListener }/>
            <img src="" ref={ img => this.imgElement = img } />
          </div>
          <button
            className="button flame-button"
            onClick={ this.uploadImg }
            disabled={ !this.state.uploadEnabled }>Roast me!</button>
          { this.state.uploading ?
            <Spinner spinnerName="circle" className="upload-spinner dark" noFadeIn/> : ''
          } 
        </div>
      </ModalDialog>
    );
  }
}

UploadModal.propTypes = {
  isOpen: React.PropTypes.bool,
  onOpen: React.PropTypes.func,
  onClose: React.PropTypes.func,
};
