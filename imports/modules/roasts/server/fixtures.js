import { Random } from 'meteor/random';
import { faker } from 'meteor/digilord:faker';

import Seed from '/imports/modules/utility/seeder';
import { Roasts } from '../roasts-collection';
import { Comments } from '../comments-collection';

const createRoasts = () => {
  Seed('roasts', {
    num: 20,
    ignoreExistingData: false,
    environments: ['development'],
    model(index) {
      return {
        title: faker.lorem.sentence(),
        userId: faker.random.uuid(),
        userName: faker.internet.userName(),
        userImage: faker.internet.avatar(),
        category: {
          name: 'new',
          enteredAt: faker.date.recent(),
        },
        imageUrl: faker.image.imageUrl(),
      }
    },
  });
};

const createComments = () => {
  const roasts = Roasts.find().fetch();
  _.each(roasts, (roast) => {
    Seed('comments', {
      num: 10,
      ignoreExistingData: true,
      environments: ['development'],
      model(index) {
        return {
          content: faker.lorem.paragraph(),
          userId: faker.random.uuid(),
          userName: faker.internet.userName(),
          userImage: faker.internet.avatar(),
          roastId: roast._id,
        }
      },
    });
  });
};

const createReplies = () => {
  const comments = Comments.find().fetch();
  _.each(comments, (comment) => {
    Seed('comments', {
      num: Math.floor(Math.random() * 5),
      ignoreExistingData: true,
      environments: ['development'],
      model(index) {
        return {
          content: faker.lorem.paragraph(),
          userId: faker.random.uuid(),
          userName: faker.internet.userName(),
          userImage: faker.internet.avatar(),
          roastId: comment.roastId,
          replyTo: comment._id,
        }
      },
    });
  });
}

Meteor.startup(function(){
  /*Roasts.remove({});
  Comments.remove({});*/

  // use to migrate schema
  // Roasts.find().fetch().forEach(roast => {
  //   if(typeof roast.category !== 'object')
  //     Roasts.update({ _id: roast._id }, { $set: { category: { name: 'new', enteredAt: roast.createdAt } } });
  // })

  if(Roasts.find().count() < 1 && Comments.find().count() < 1 && process.env.NODE_ENV === 'development') {
    createRoasts();
    createComments();
    createReplies();
  }
});
