import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { SchemaCommons } from '/imports/modules/utility/schema-commons.js';
import { Roasts } from '/imports/modules/roasts/roasts-collection';
import { Comments } from '/imports/modules/roasts/comments-collection';

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
  status: {
    type: String,
    allowedValues: ['active', 'cautioned', 'banned'],
    autoValue() {
      if(this.isInsert) {
        return 'active';
      }
    },
  },
  heartbeat: {
    type: Date,
    optional: true,
  },
});

Meteor.users.attachSchema(UsersSchema);

Meteor.users.after.update(function(userId, doc) {
  const userImage = doc.services.facebook ? doc.services.facebook.picture : doc.services.google ? doc.services.google.picture : '';
  Roasts.update({ userId }, { $set: { userImage } }, { multi: true });
  Comments.update({ userId }, { $set: { userImage } }, { multi: true });
});
