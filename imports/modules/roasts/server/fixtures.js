import { Random } from 'meteor/random';

import { Roasts } from '../roasts-collection';
import { Comments } from '../comments-collection';

Meteor.publish('all-roasts', function() {
  return Roasts.find();
});

Meteor.publish('all-comments', function() {
  return Comments.find();
});

Meteor.startup(function(){
  if(Roasts.find().count() <= 0) {
    const Roast = {
      userId: "JGckJnFogrBaG9tgv",
      userName: "Fred",
      userImage: "/Fred.jpg",
      imageUrl: "/Fred.jpg",
      totalUpvotes: 0,
    };

    Roasts.insert(Roast);
  }
  if(Comments.find().count() <= 0) {
    const Comment = {
      content: "Hässlicher Mongo",
      isReply: false,
      votes: [],
      userId: "fakeUser",
      userName: "fakeUser",
      userImage: "/Fred.jpg",
      roastId: Roasts.findOne()._id,
    };

    Comments.insert(Comment);
  }

  const Roast = Roasts.findOne();
});
