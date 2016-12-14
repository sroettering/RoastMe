import { Slingshot } from 'meteor/edgee:slingshot';
import { Resizer } from 'meteor/thinksoftware:image-resize-client';

export default ImageUpload = (file, imgElement, title, onFinished) => {
  const width = imgElement.naturalWidth;
  const height = imgElement.naturalHeight;
  const aspectRatio = width / height;
  const resizeOptions = {
    width: Math.min(1200, 1200 * aspectRatio),
    height: Math.min(1200, 1200 / aspectRatio),
    cropSquare: false,
  };

  Resizer.resize(file, resizeOptions, (error, resizedFile) => {
    const uploader = new Slingshot.Upload("uploadRoastImgS3");
    let fileToUpload = resizedFile;
    if(error) {
      fileToUpload = file;
    }
    uploader.send(fileToUpload, (error, url) => {
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
          } else {
            onFinished(result);
          }
        });
      }
    });
  });
}
