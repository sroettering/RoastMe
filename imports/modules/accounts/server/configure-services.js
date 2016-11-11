import { Meteor } from 'meteor/meteor';
import { ServiceConfiguration } from 'meteor/service-configuration';

const services = Meteor.settings.private.oAuth;

const configure = () => {
  if (services) {
    for (const service in services) {
      ServiceConfiguration.configurations.upsert({ service }, {
        $set: services[service],
      });
    }
  }
};

configure();
