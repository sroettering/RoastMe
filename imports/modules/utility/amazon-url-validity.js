export const checkAmazonUrlValidity = (url) => {
  let test = { valid: true };
  if(url.indexOf('itsroastme.s3-eu-central-1.amazonaws.com') < 0) {
    test.valid = false;
    test.error = `Url "${url}" is not a valid amazonaws url!`;
  }

  if(!test.valid) {
    throw new Meteor.Error("file-error", test.error);
  }
}
