import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Roasts } from '/imports/modules/roasts/roasts-collection';
import { Comments } from '/imports/modules/roasts/comments-collection';

Meteor.methods({
  acceptRulesAndTos() {
    if(!this.userId) return;
    Meteor.users.update({ _id: this.userId },
      {
        $set: {
          rulesAccepted: true,
          tosAccepted: true,
        }
      }
    );
  },
  changeUsername(username) {
    check(username, String);
    if(!this.userId) return;
    Meteor.users.update({ _id: this.userId },
      {
        $set: {
          "profile.name": username,
        }
      }
    );
    Roasts.update({ userId: this.userId },
      {
        $set: {
          userName: username,
        }
      }, { multi: true });
    Comments.update({ userId: this.userId },
      {
        $set: {
          userName: username,
        }
      }, { multi: true });
  }
});
