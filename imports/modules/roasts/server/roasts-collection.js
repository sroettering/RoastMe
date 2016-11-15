import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { SchemaCommons } from '/imports/modules/utility/schema-commons.js';

const ReplySchema = new SimpleSchema({
  content: {
    type: String,
  },
  upvotes: {
    type: Number,
    autoValue() {
      if (this.isInsert) {
        return 0;
      } else if (this.isUpsert) {
        return { $setOnInsert: 0 };
      }
    },
  },
  createdAt: SchemaCommons.createdAt,
  updatedAt: SchemaCommons.updatedAt,
});

const CommentsSchema = new SimpleSchema({
  content: {
    type: String,
  },
  upvotes: {
    type: Number,
    autoValue() {
      if (this.isInsert) {
        return 0;
      } else if (this.isUpsert) {
        return { $setOnInsert: 0 };
      }
    },
  },
  replies: {
    type: [ReplySchema],
    optional: true,
  },
  createdAt: SchemaCommons.createdAt,
  updatedAt: SchemaCommons.updatedAt,
});

const RoastsSchema = new SimpleSchema({
  userId: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  comments: {
    type: [CommentsSchema],
    optional: true,
  },
  totalUpvotes: {
    type: Number,
    autoValue() {
      if (this.isInsert) {
        return 0;
      } else if (this.isUpsert) {
        return { $setOnInsert: 0 };
      }
    },
  },
  createdAt: SchemaCommons.createdAt,
  updatedAt: SchemaCommons.updatedAt,
});

export const Roasts = new Mongo.Collection('roasts');

Roasts.attachSchema(RoastsSchema);
