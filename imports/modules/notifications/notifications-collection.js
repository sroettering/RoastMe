import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { SchemaCommons } from '/imports/modules/utility/schema-commons.js';

// Bert.alert({
//   title: "Wrong image format",
//   message: `image type ${this.image.type} is not supported`,
//   type: "warning",
//   icon: "fa fa-info",
// });

const NotificationsSchema = new SimpleSchema({
  title: {
    type: String,
  },
  message: {
    type: String,
  },
  type: {
    type: String,
  },
  icon: {
    type: String,
  },
  userId: {
    type: String,
  },
  userName: {
    type: String,
  },
  status: {
    type: String,
    allowedValues: ['unread', 'read'],
    autoValue() {
      if(this.isInsert) {
        return 'unread';
      }
    },
  },
  createdAt: SchemaCommons.createdAt,
  updatedAt: SchemaCommons.updatedAt,
});

export const Notifications = new Mongo.Collection('notifications');

Notifications.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Notifications.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

Notifications.attachSchema(NotificationsSchema);
