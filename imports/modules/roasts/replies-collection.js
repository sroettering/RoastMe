import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { SchemaCommons } from '/imports/modules/utility/schema-commons.js';

const ReplySchema = new SimpleSchema({
  content: {
    type: String,
  },
  votes: {
    type: [String], // Array of userIDs
  },
  createdAt: SchemaCommons.createdAt,
  updatedAt: SchemaCommons.updatedAt,
});

export const Replies = new Mongo.Collection('replies');

Replies.attachSchema(ReplySchema);
