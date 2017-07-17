import { Meteor } from 'meteor/meteor';

import { Notifications } from '../notifications-collection';

Meteor.publish('notification.unread', function() {
  if(this.userId) {
    return Notifications.find(
      {
        userId: this.userId,
        status: 'unread'
      }, {
        sort: { createdAt: 1 },
        fields: { updatedAt: 0 },
        limit: 1,
      }
    );
  } else {
    this.ready();
  }
});
