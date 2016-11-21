import { Meteor } from 'meteor/meteor';

export const upvote = (commentId) => {
  const userId = Meteor.userId();
  if(!userId || !commentId) {
    return false;
  }

  Meteor.call('upvoteComment', commentId);
}

export const downvote = (commentId) => {
  const userId = Meteor.userId();

  if(!userId || !commentId) {
    return false;
  }

  Meteor.call('downvoteComment', commentId);
}
