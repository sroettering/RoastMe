import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

import withUser from '/imports/decorators/withUser';
import Rules from './Rules';

@withUser
export default class IntroPage extends Component {

  acceptRulesAndTos() {
    Meteor.call('acceptRulesAndTos');
  }

  render() {
    const { user } = this.props;
    if(user && user.rulesAccepted && user.tosAccepted) {
      return <Redirect to='/' />;
    } else {
      return (
        <div className="wrapper rules">
          <Rules />
          <p>By continuing you accept our rules and the <Link to="/tos" target="_blank">Terms of Service</Link></p>
          <button className="button" onClick={ this.acceptRulesAndTos.bind(this) }>Accept and Continue</button>
        </div>
      );
    }
  }
}