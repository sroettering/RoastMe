import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker'
import { ReactiveVar } from 'meteor/reactive-var';
import { withMethodData } from 'meteor/orionsoft:react-meteor-data';

const limit = new ReactiveVar(10);

export default withMethodData((props, ready) => {
    const { category } = props;
    if(!category || category !== 'hot' && category !== 'trending' && category !== 'new') {
        throw new Meteor.Error('invalid props', 'allowed values are hot, new or trending');
    }
    Tracker.autorun(() => {
      Meteor.call('getRoastsByCategory', category, limit.get(), (error, response) => {
        response.limit = limit;
        ready(error, response);
      });
    });
});