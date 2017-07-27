import { Meteor } from 'meteor/meteor';
import { withMethodData } from 'meteor/orionsoft:react-meteor-data';

export default withMethodData((props, ready) => {
    const { roast } = props;
    Meteor.call('getBestComment', roast._id, ready);
});