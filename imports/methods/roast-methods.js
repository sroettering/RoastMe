import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';

import { Roasts } from '/imports/modules/roasts/roast-collection';

Meteor.methods({
    getRoastsByCategory(category, limit) {
        check(category, String);
        check(limit, Number);

        return Roasts.find({
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
        });
    }
});