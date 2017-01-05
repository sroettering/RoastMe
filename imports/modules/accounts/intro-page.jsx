import React, { Component } from 'react';
import { browserHistory, Link } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';

import { Rules } from './rules';

export class IntroPage extends Component {

  componentWillUpdate() {
    if(Meteor.user() && Meteor.user().rulesAccepted && Meteor.user().tosAccepted) {
      browserHistory.push('/');
    }
  }

  acceptRulesAndTos() {
    Meteor.call('acceptRulesAndTos', (error) => {
      if(!error) {
        browserHistory.push('/');
      } else {
        Bert.alert('An unknown error occurred', 'danger');
      }
    });
  }

  render() {
    return (
      <div className="wrapper rules">
        <Rules />
        <p>By continuing you accept our rules and the <Link to="/tos" target="_blank">Terms of Service</Link></p>
        <button className="button" onClick={ this.acceptRulesAndTos.bind(this) }>Accept and Continue</button>
      </div>
    );
  }
}
