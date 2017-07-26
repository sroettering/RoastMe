import { withMethodData } from 'meteor/orionsoft:react-meteor-data';
import { Roasts } from '/imports/modules/roasts/roasts-collection';

export default (category) => {
    return withMethodData((props, ready) => {
        console.log(category);
        Meteor.call('getRoastsByCategory', category, 10, ready);
    });
};