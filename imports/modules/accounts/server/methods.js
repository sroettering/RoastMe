import { Meteor } from 'meteor/meteor';

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
});
