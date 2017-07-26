import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';

import withUser from '/imports/decorators/withUser';

@withUser
export default class SecuredRoute extends React.Component {
    render() {
        const { 
            role = 'user',
            user,
            component,
            ...rest
        } = this.props;
        const loggingIn = Meteor.loggingIn();
        const authenticated = !loggingIn && !!user && Roles.userIsInRole(user, role);
        console.log(authenticated); // TODO authenticated does not always work
        return(
            <Route {...rest} render={(props) => {
                if (loggingIn) return <div></div>;
                return authenticated ?
                (React.createElement(component, { ...props })) :
                (<Redirect to="/" />);
            }} />
        );
    }
}