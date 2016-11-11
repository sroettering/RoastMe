import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { check } from 'meteor/check';
import { moment } from 'meteor/momentjs:moment';

function getDayDifference(date1, date2) {
  date1.setHours(12, 0, 0, 0);
  date2.setHours(12, 0, 0, 0);
  const timeDiff = Math.abs(date2.getTime() - date1.getTime());
  const diffDays = Math.floor(timeDiff / (1000 * 3600 * 24));
  return diffDays;
}

Meteor.publish('usersPerDay', function (historyLength) {
  check(historyLength, Number);
  const self = this;
  const tempId = Random.id();
  const dateLimit = new Date();
  dateLimit.setHours(12, 0, 0, 0);
  dateLimit.setDate(dateLimit.getDate() - (historyLength - 1));
  const curDate = moment(dateLimit);
  const stats = {
    userDeltas: [],
    labels: [],
    updatedAt: new Date(),
  };

  for (let i = 0; i < historyLength; i++) {
    stats.userDeltas.push(0);
    stats.labels.push(curDate.format('DD.MM.YY'));
    curDate.add(1, 'd');
  }

  self.added('userStats', tempId, stats);

  const userHandle = Meteor.users.find({ createdAt: { $gte: dateLimit } }, { sort: { createdAt: 1 } }).observeChanges({
    added(id, doc) {
      const day = getDayDifference(dateLimit, doc.createdAt);
      stats.userDeltas[day]++;
      stats.updatedAt = new Date();
      self.changed('userStats', tempId, stats);
    },
    removed() {
      const day = historyLength - 1;
      stats.userDeltas[day]--;
      stats.updatedAt = new Date();
      self.changed('userStats', tempId, stats);
    },
  });

  this.ready();
  self.onStop(() => {
    userHandle.stop();
  });
});
