import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';

Meteor.methods({
  addGoogleAgeRange() {
    if (Meteor.user() && Meteor.user().services.google) {
      const userId = Meteor.user().services.google.id;
      const url = `https://www.googleapis.com/plus/v1/people/${userId}`;
      const params = {
        access_token: Meteor.user().services.google.accessToken,
      };
      HTTP.get(url, { params }, (err, result) => {
        if (err) {
          console.log(err.message);
        } else {
          Meteor.users.update(this.userId, { $set: { "services.google.age_range": result.data.ageRange } });
        }
      });
    }
  },
  addFacebookImage() {
    if (Meteor.user() && Meteor.user().services.facebook) {
      const userId = Meteor.user().services.facebook.id;
      const url = `http://graph.facebook.com/v2.8/${userId}/picture`;
      const params = {
        redirect: false,
        type: 'large',
        height: 425,
      };
      HTTP.get(url, { params }, (err, result) => {
        if (err) {
          console.log(err.message);
        } else {
          Meteor.users.update(this.userId, { $set: { "services.facebook.picture": result.data.data.url } });
        }
      });
    }
  },
});
