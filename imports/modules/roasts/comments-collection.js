import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { SchemaCommons } from '/imports/modules/utility/schema-commons.js';

const CommentsSchema = new SimpleSchema({
  content: {
    type: String,
  },
  isReply: {
    type: Boolean,
  },
  votes: {
    type: [String], // Array of userIDs
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

Comments.attachSchema(CommentsSchema);
