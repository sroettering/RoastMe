import { withData } from 'meteor/orionsoft:react-meteor-data';
import { Notifications } from '/imports/modules/notifications/notifications-collection';

export default withData(() => {
    Meteor.subscribe('notification.unread');
    const notifications = Notifications.find().fetch();
    return { notifications };
});