import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { SchemaCommons } from '/imports/modules/utility/schema-commons.js';

const UserProfile = new SimpleSchema({
  name: {
    type: String,
  },
});

export const UsersSchema = new SimpleSchema({
  profile: {
    type: UserProfile,
  },
  roles: {
    type: Array,
    optional: true,
  },
  'roles.$': {
    type: String,
  },
  services: {
    type: Object,
    optional: true,
    blackbox: true,
  },
  createdAt: SchemaCommons.createdAt,
  updatedAt: SchemaCommons.updatedAt,
  rulesAccepted: {
    type: Boolean,
    autoValue() {
      if(this.isInsert) {
        return false;
      }
    },
  },
  tosAccepted: {
    type: Boolean,
    autoValue() {
      if(this.isInsert) {
        return false;
      }
    },
  },
  heartbeat: {
    type: Date,
    optional: true,
  },
});

Meteor.users.attachSchema(UsersSchema);
