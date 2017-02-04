import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

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
  }
});
