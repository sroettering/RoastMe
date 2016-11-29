import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { _ } from 'meteor/underscore';
import { moment } from 'meteor/momentjs:moment';

import { Roasts } from '/imports/modules/roasts/roasts-collection';
import { Comments } from '/imports/modules/roasts/comments-collection';

class UserProfileC extends Component {

  constructor(props) {
    super(props);
    this.getTotalPoints = this.getTotalPoints.bind(this);
  }

  getTotalPoints() {
    let points = 0;
    _.each(this.props.comments, (comment) => {points += comment.points});
    return points;
  }

  render() {
    if(this.props.user && this.props.user.services) {
      const user = this.props.user;
      const name = user.profile.username || user.profile.name;
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
            <div className="wrapper">
              <div className="profile-picture">
                <img src={ avatar } alt="" />
              </div>
              <div className="profile-information">
                <h1>{ name }</h1>
                <div className="profile-score">
                  <p className="big">Roasts: { this.props.comments.length || 0 }<span className="mdi mdi-fire"></span></p>
                  <p className="big">Points: { this.getTotalPoints() }<span className="mdi mdi-trophy-award"></span></p>
                </div>
                <p className="membership">Member since { since }</p>
              </div>
            </div>
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
  roasts: React.PropTypes.array,
  comments: React.PropTypes.array,
}

export const UserProfile = createContainer((props) => {
  const user = Meteor.user();
  const roastsHandle = Meteor.subscribe('all-roasts-for-user');
  const commentsHandle = Meteor.subscribe('all-comments-for-user');
  const roasts = Roasts.find({ userId: Meteor.userId() }).fetch();
  const comments = Comments.find({ userId: Meteor.userId() }).fetch();
  return {
    user,
    roasts,
    comments,
  }
}, UserProfileC);
