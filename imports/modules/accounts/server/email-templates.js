import { Accounts } from 'meteor/accounts-base';

const name = 'Application Name';
const email = '<support@application.com>';
const from = `${name} ${email}`;
const emailTemplates = Accounts.emailTemplates;

emailTemplates.siteName = name;
emailTemplates.from = from;

emailTemplates.resetPassword = {
  subject() {
    
  },
  text(user, url) {

  },
};
