import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { check } from 'meteor/check';
import { moment } from 'meteor/momentjs:moment';

import { Roasts } from '/imports/modules/roasts/roasts-collection';
import { Comments } from '/imports/modules/roasts/comments-collection';

function getDayDifference(date1, date2) {
  date1.setHours(12, 0, 0, 0);
  date2.setHours(12, 0, 0, 0);
  const timeDiff = Math.abs(date2.getTime() - date1.getTime());
  const diffDays = Math.floor(timeDiff / (1000 * 3600 * 24));
  return diffDays;
}

Meteor.publish('admin.stats', function () {
  const self = this;
  const tempId = Random.id();
  const dateLimit = new Date(2017, 0, 1, 0, 0, 0, 0);

  const stats = {
    totalUsers: 0,
    totalRoasts: 0,
    totalComments: 0,
  };

  self.added('stats', tempId, stats);

  const userHandle = Meteor.users.find({ roles: { $nin: ['admin'] } }).observeChanges({
    added(id, doc) {
      stats.totalUsers++;
      self.changed('stats', tempId, stats);
    },
    removed() {
      stats.totalUsers--;
      self.changed('stats', tempId, stats);
    },
  });

  const roastHandle = Roasts.find({ status: 'accepted' }).observeChanges( {
    added(id, doc) {
      stats.totalRoasts++;
      self.changed('stats', tempId, stats);
    },
    changed(id, fields) { // TODO this does not capture roasts that go from accepted to sth else
      if(fields.status && fields.status == 'accepted') {
        stats.totalRoasts++;
        self.changed('stats', tempId, stats);
      }
    },
    removed() {
      stats.totalRoasts--;
      self.changed('stats', tempId, stats);
    },
  });

  const commentHandle = Comments.find().observeChanges( {
    added(id, doc) {
      stats.totalComments++;
      self.changed('stats', tempId, stats);
    },
    removed() {
      stats.totalComments--;
      self.changed('stats', tempId, stats);
    },
  });

  this.ready();
  self.onStop(() => {
    userHandle.stop();
    roastHandle.stop();
    commentHandle.stop();
  });
});
