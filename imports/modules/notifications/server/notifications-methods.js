import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';

import { Notifications } from '../notifications-collection';

Meteor.methods({
  createNotification(title, message, type, icon, userId, userName) {
    check(title, String);
    check(message, String);
    check(type, String);
    check(icon, String);
    check(userId, String);
    check(userName, String);

    if(!this.userId) return;
    if(!Roles.userIsInRole(this.userId, 'admin')) return;
    if(!title || !message || !userId) return;

    type = type || 'info';
    icon = icon || 'fa fa-info';

    const notification = { title, message, type, icon, userId, userName };
    Notifications.insert(notification);
  },
  readNotification(notificationId) {
    check(notificationId, String);

    if(!this.userId) return;

    const notification = Notifications.findOne({ _id: notificationId, userId: this.userId });
    if(!notification) return;

    Notifications.update({ _id: notificationId }, { $set: { status: 'read' } });
  }
});
