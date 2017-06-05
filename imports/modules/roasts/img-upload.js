import { Slingshot } from 'meteor/edgee:slingshot';

export default ImageUpload = (blob, title, onFinished) => {
  const uploader = new Slingshot.Upload("uploadRoastImgS3");

  uploader.send(blob, (error, url) => {
    if(error) {
      Bert.alert({
        title: "Upload failed",
        message: error.message,
        type: "danger",
        icon: "fa fa-exclamation-triangle",
      });
      onFinished(error, null);
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
          onFinished(null, result);
        }
      });
    }
  });
};
