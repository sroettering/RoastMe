import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

export class RoastVerificationPanel extends Component {

  acceptRoast() {
    const { roast } = this.props;
    if(!roast) return;
    Meteor.call('acceptRoast', roast._id);
  }

  declineRoast() {
    const { roast } = this.props;
    if(!roast) return;
    // TODO send this.reason.value to server and send an email to the user
    Meteor.call('declineRoast', roast._id);
  }

  render() {
    const { roast, numQueued, email } = this.props;
    if(!roast) {
      return (
        <div className="dashboard-panel verification-panel">
          <span>No Roasts today, Sir!</span>
        </div>
      );
    } else {
      return (
        <div className="dashboard-panel verification-panel">
          <h3>Verification</h3>
          <span>Queued: { numQueued }</span>
          <span>Title: { roast.title }</span>
          <span>User: { roast.userName }</span>
          <span>Email: { email }</span>
          <img className="roast-image" src={ roast.imageUrl } alt=""/>
          <button className="button mdi mdi-thumb-up" onClick={ this.acceptRoast.bind(this) }>Accept</button>
          <button className="button mdi mdi-thumb-down" onClick={ this.declineRoast.bind(this) }>Decline</button>
          <span>Reason (sent per mail):</span>
          <textarea ref={ e => this.reason = e }></textarea>
        </div>
      );
    }
  }
}

RoastVerificationPanel.propTypes = {
  numQueued: React.PropTypes.number,
  roast: React.PropTypes.object,
  email: React.PropTypes.string,
};
