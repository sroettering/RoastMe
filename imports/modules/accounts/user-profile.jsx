import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { _ } from 'meteor/underscore';
import { moment } from 'meteor/momentjs:moment';

import { Roasts } from '/imports/modules/roasts/roasts-collection';
import { Comments } from '/imports/modules/roasts/comments-collection';
import { Score } from '/imports/modules/roasts/components/score';
import { ProfileRoast } from './profile-roast';
import { TabComponent } from '/imports/modules/ui/tab-component';

class UserProfileC extends Component {

  constructor(props) {
    super(props);
    this.getTotalPoints = this.getTotalPoints.bind(this);
    this.resetUsername = this.resetUsername.bind(this);
    this.state = {
      username: '',
    };
  }

  getTotalPoints() {
    let points = 0;
    _.each(this.props.comments, (comment) => {points += comment.points});
    return points;
  }

  logout() {
    Meteor.logout();
    browserHistory.push('/');
  }

  usernameChanged(event) {
    this.setState({ username: this.usernameField.value });
  }

  submitUsername(event) {
    if(event.key === "Enter") {
      const username = this.usernameField.value;
      if(!username) {
        this.resetUsername();
        Bert.alert('Really?' ,'warning');
      } else if(username !== this.props.user.profile.name) {
        Meteor.call('changeUsername', username, (error, result) => {
          if(error) {
            Bert.alert(error.reason, 'danger');
          } else {
            Bert.alert('Done!', 'success');
          }
        });
      }
    }
  }

  resetUsername() {
    this.usernameField.value = this.props.user.profile.name;
  }

  focusUsernameField() {
    this.usernameField.focus();
  }

  render() {
    if(this.props.user && this.props.user.services) {
      const { user, comments, uploads, ownProfile } = this.props;
      const name = this.state.username || user.profile.name;
      const since = moment(user.createdAt).format('DD.MM.YYYY');

      let avatar;
      if(user.services.facebook) {
        avatar = user.services.facebook.picture;
      } else if(user.services.google) {
        avatar = user.services.google.picture;
      }
      return (
        <div className="profile">
          <div className="profile-section">
            <div className="profile-picture">
              <img src={ avatar } alt={ name } />
            </div>
            <div className="profile-information">
              <div className="username">
                <input
                  className="username-input"
                  type="text"
                  value={ name }
                  onChange={ this.usernameChanged.bind(this) }
                  onKeyPress={ this.submitUsername.bind(this) }
                  onBlur={ this.resetUsername }
                  ref={ input => this.usernameField = input }
                  disabled={ !ownProfile } />
                { ownProfile ?
                  <span className="mdi mdi-pencil" onClick={ this.focusUsernameField.bind(this) }></span>
                   : '' }
              </div>
              <div className="profile-score">
                <Score comments={ comments.length } points={ this.getTotalPoints() } />
              </div>
              <span className="membership">Member since { since }</span>
              { ownProfile ? <button className="flat-button" onClick={ this.logout.bind(this) }>Logout</button> : '' }
            </div>
          </div>
          <div className="profile-section">
            <TabComponent tabHeadings={ ['Best Roasts', 'Own Roasts'] } >
              <div className="profile-roasts">
                { comments.map((comment, index) => <ProfileRoast key={ index } comment={ comment } />) }
              </div>
              <div className="profile-uploads">
                Uploads
              </div>
            </TabComponent>
          </div>
        </div>
      );
    } else {
      return (
        <h3>Loading...</h3>
      );
    }
  }

}

UserProfileC.propTypes = {
  user: React.PropTypes.object,
  comments: React.PropTypes.array,
  uploads: React.PropTypes.array,
  ownProfile: React.PropTypes.bool,
}

export const UserProfile = createContainer(({ params }) => {
  const userId = params.id;
  const userHandle = Meteor.subscribe('user.profile', userId);
  const user = Meteor.users.findOne(userId);
  const ownProfile = Meteor.userId() === userId;
  const commentsHandle = Meteor.subscribe('all-comments-for-user', userId);
  const uploadsHandle = Meteor.subscribe('all-roasts-for-user', userId);
  let comments = Comments.find({ userId }, { sort: { points: -1 } }).fetch();
  comments = _.uniq(comments, (item) => item.roastId );
  const uploads = Roasts.find({ userId }, { sort: { createdAt: -1 } }).fetch();
  return {
    user,
    comments,
    uploads,
    ownProfile,
  }
}, UserProfileC);
