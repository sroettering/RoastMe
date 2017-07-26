import { Meteor } from 'meteor/meteor';
import { withMethodData } from 'meteor/orionsoft:react-meteor-data';

export default withMethodData((props, ready) => {
    const { category } = props;
    if(!category || category !== 'hot' && category !== 'trending' && category !== 'new') {
        throw new Meteor.Error('props', 'allowed values are hot, new or trending');
    }
    Meteor.call('getRoastsByCategory', category, 10, ready);
});