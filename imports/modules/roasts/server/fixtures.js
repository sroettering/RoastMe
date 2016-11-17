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
    let Comment = {
      content: "Hässlicher Mongo...",
      votes: [],
      userId: "fakeUser",
      userName: "fakeUser",
      userImage: "/Fred.jpg",
      roastId: Roasts.findOne()._id,
    };
    Comments.insert(Comment);

    const Reply = {
      content: "Da geb ich dir Recht",
      votes: [],
      replyTo: Comments.findOne()._id,
      userId: "fakeUser2",
      userName: "fakeUser2",
      userImage: "/Fred.jpg",
      roastId: Roasts.findOne()._id,
    }
    Comments.insert(Reply);

    Comment = {
      content: "Ich will kein Kind von dir!",
      votes: [],
      userId: "fakeUser3",
      userName: "fakeUser3",
      userImage: "/Fred.jpg",
      roastId: Roasts.findOne()._id,
    }
    Comments.insert(Comment);
  }
});
