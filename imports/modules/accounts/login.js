import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';

const triggerFbPixel = () => {
  if(fbq) {
    fbq('track', 'CompleteRegistration', {
      value: 0,
      currency: 'EUR'
    });
  }
};

export const handleLogin = (service) => {
  const options = {
    requestPermissions: [],
  };

  if (service === 'loginWithFacebook') {
    options.requestPermissions.push('email');
  }

  if (service === 'loginWithGoogle') {
    options.requestPermissions.push('https://www.googleapis.com/auth/plus.login');
    options.requestPermissions.push('https://www.googleapis.com/auth/userinfo.email');
  }

  Meteor[service](options, (error) => {
    if (error) {
      Bert.alert({
        title: "Whooops",
        message: "There was an error while logging you in!",
        type: "danger",
        icon: "fa fa-remove",
      });
    } else if (Meteor.user().services.google) {
      // We need to retrieve the age range of a user manually from google after first log in
      Meteor.call('addGoogleAgeRange');
    } else if (Meteor.user().services.facebook) {
      // We need to retrieve the url for the facebook image
      Meteor.call('addFacebookImage');
    }

    if (!error) {
      if (!Meteor.user().rulesAccepted || !Meteor.user().tosAccepted) {
        triggerFbPixel();
        //browserHistory.push('/postSignup');
      } else {
        //browserHistory.push('/');
      }
    }
  });
};
