import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { SchemaCommons } from '/imports/modules/utility/schema-commons.js';
import { Roasts } from './roasts-collection';

const CommentsSchema = new SimpleSchema({
  content: {
    type: String,
  },
  replyTo: {
    type: String,
    optional: true,
  },
  upvotes: {
    type: [Object],
    autoValue() {
      if(this.isInsert) {
        return [];
      }
    },
  },
  "upvotes.$.userId": {
    type: String,
  },
  "upvotes.$.createdAt": {
    type: Date,
    autoValue() {
      if(this.isInsert) {
        return new Date();
      }
    },
  },
  downvotes: {
    type: [Object],
    autoValue() {
      if(this.isInsert) {
        return [];
      }
    },
  },
  "downvotes.$.userId": {
    type: String,
  },
  "downvotes.$.createdAt": {
    type: Date,
    autoValue() {
      if(this.isInsert) {
        return new Date();
      }
    },
  },
  points: {
    type: Number,
    autoValue() {
      if(this.isInsert) {
        return 0;
      }
    },
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
  roastId: {
    type: String,
  },
  createdAt: SchemaCommons.createdAt,
  updatedAt: SchemaCommons.updatedAt,
});

export const Comments = new Mongo.Collection('comments');

Comments.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Comments.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

Comments.attachSchema(CommentsSchema);

Comments.after.insert(function(userId, doc) {
  Roasts.update({ _id: doc.roastId }, { $inc: { totalComments: 1 } });
});

Comments.after.remove(function(userId, doc) {
  Roasts.update({ _id: doc.roastId }, { $inc: { totalComments: -1 } });
});
