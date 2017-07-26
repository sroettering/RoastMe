import { Meteor } from 'meteor/meteor';
import { withMethodData } from 'meteor/orionsoft:react-meteor-data';

export default withMethodData((props, ready) => {
    const { roast } = props;
    console.log(roast._id);
    Meteor.call('getBestComment', roast._id, ready);
});