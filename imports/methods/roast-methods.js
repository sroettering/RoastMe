import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Roasts } from '/imports/modules/roasts/roasts-collection';
import { Comments } from '/imports/modules/roasts/comments-collection';

Meteor.methods({
    getRoastsByCategory(category, limit) {
        check(category, String);
        check(limit, Number);

        const roasts = Roasts.find({
            status: 'accepted',
            "category.name": category
        }, {
            sort: { "category.enteredAt": -1 },
            limit: limit,
            fields: {
                status: 0,
                createdAt: 0,
                updatedAt: 0,
            },
        }).fetch();

        return { roasts };
    },
    getBestComment(roastId) {
        check(roastId, String);
        
        const comment = Comments.findOne({
            roastId: roastId,
            replyTo: null
        }, {
            sort: { points: -1 },
            limit: 1,
            fields: {
                upvotes: 0,
                downvotes: 0,
                updatedAt: 0,
            }
        });
        
        return { comment };
    }
});