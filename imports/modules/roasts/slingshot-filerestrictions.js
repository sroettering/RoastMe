import { Slingshot } from 'meteor/edgee:slingshot';

Slingshot.fileRestrictions("uploadRoastImgS3", {
  allowedFileTypes: ["image/png", "image/jpeg", "image/gif"],
  maxSize: 8 * 1024 * 1024, // 1MB
});
