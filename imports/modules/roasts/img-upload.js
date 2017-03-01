import { Slingshot } from 'meteor/edgee:slingshot';
import Compress from 'compress.js';

const compress = new Compress();

export default ImageUpload = (file, imgElement, title, onFinished) => {
  compress.compress([file], {
    size: 1, // mb
    quality: 1, // max 1
    maxWidth: 800, // aspect ratio is unchanged
    maxHeight: 800,
    resize: true,
  }).then(data => {
    const base64 = data[0];
    const file = Compress.convertBase64ToFile(base64.data, base64.ext);

    const uploader = new Slingshot.Upload("uploadRoastImgS3");
    uploader.send(file, (error, url) => {
      if(error) {
        Bert.alert({
          title: "Upload failed",
          message: error.message,
          type: "danger",
          icon: "fa fa-exclamation-triangle",
        });
      } else {
        Meteor.call("createRoast", url, title, (error, result) => {
          if(error) {
            Bert.alert({
              title: "Upload failed",
              message: error.error,
              type: "danger",
              icon: "fa fa-exclamation-triangle",
            });
            onFinished(error, null);
          } else {
            onFinished(result, null);
          }
        });
      }
    });
  });
}
