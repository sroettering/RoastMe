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
    allowedValues: ['queued', 'accepted', 'declined', 'banned', 'deleted'],
    autoValue() {
      if(this.isInsert) {
        return 'queued';
      }
    },
  },
  category: {
    type: Object,
  },
  "category.name": {
    type: String,
    allowedValues: ['new', 'trending', 'hot'],
    autoValue() {
      if(this.isInsert) {
        return 'new';
      }
    },
  },
  "category.enteredAt": {
    type: Date,
    autoValue() {
      if(this.isInsert) {
        return new Date();
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

Roasts.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Roasts.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

Roasts.attachSchema(RoastsSchema);
