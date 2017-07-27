import { withData } from 'meteor/orionsoft:react-meteor-data';
import { moment } from 'meteor/momentjs:moment';

export default withData(({ comment }) => {
  const hoursPassed = moment(Session.get('now')).diff(comment.createdAt, 'hours');
  let timeString = moment(comment.createdAt).fromNow();
  if(hoursPassed >= 24) {
    timeString = moment(comment.createdAt).format('DD.MM.YY - HH:mm');
  }
  return { time: timeString };
});