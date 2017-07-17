import { withData } from 'meteor/orionsoft:react-meteor-data';

export default withData(() => {
    const handle = Meteor.subscribe('user.current');
    const user = Meteor.user();
    const userReady = handle.ready();
    if(user && userReady) {
        const service = Object.keys(user.services)[0];
        user.getAvatarUrl = () => {
            return user.services[service].picture || '';
        };
        user.getEmail = () => {
            return user.services[service].email || '';
        };
    }
    return { user, userReady };
});