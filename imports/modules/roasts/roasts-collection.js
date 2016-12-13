import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { SchemaCommons } from '/imports/modules/utility/schema-commons.js';

const RoastsSchema = new SimpleSchema({
  title: {
    type: String,
  },
  userId: {
    type: String,
  },
  userName: {
    type: String,
  },
  userImage: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  status: {
    type: String,
    allowedValues: ['queued', 'accepted', 'declined', 'banned'],
    autoValue() {
      if(this.isInsert) {
        return 'queued';
      }
    },
  },
  totalUpvotes: {
    type: Number,
    autoValue() {
      if(this.isInsert) {
        return 0;
      }
    },
  },
  totalComments: {
    type: Number,
    autoValue() {
      if(this.isInsert) {
        return 0;
      }
    },
  },
  createdAt: SchemaCommons.createdAt,
  updatedAt: SchemaCommons.updatedAt,
});

export const Roasts = new Mongo.Collection('roasts');

Roasts.attachSchema(RoastsSchema);
