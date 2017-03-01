import { Meteor } from 'meteor/meteor';
import { Slingshot } from 'meteor/edgee:slingshot';

import { Roasts } from '/imports/modules/roasts/roasts-collection';

Slingshot.createDirective("uploadRoastImgS3", Slingshot.S3Storage, {
  region: "eu-central-1",
  bucket: "itsroastme",
  acl: "public-read",
  authorize() {
    return Meteor.userId();
  },
  key(file) {
    const imageUrl = `${process.env.NODE_ENV}/${Meteor.userId()}/roasts/${file.name}`;
    const roast = Roasts.findOne({ imageUrl });
    if(roast) throw new Meteor.Error("duplicate-roast", "This file already exists!");
    return imageUrl;
  },
});
