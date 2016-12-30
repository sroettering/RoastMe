import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { _ } from 'meteor/underscore';
import { moment } from 'meteor/momentjs:moment';

import { Roasts } from '/imports/modules/roasts/roasts-collection';
import { Comments } from '/imports/modules/roasts/comments-collection';
import { Score } from '/imports/modules/roasts/components/score';
import { ProfileRoast } from './profile-roast';

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
      const { user, comments } = this.props;
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
                <img src={ avatar } alt={ name } />
              </div>
              <div className="profile-information">
                <h1>{ name }</h1>
                <div className="profile-score">
                  <Score comments={ comments.length } points={ this.getTotalPoints() } />
                </div>
                <p className="membership">Member since { since }</p>
              </div>
            </div>
          </div>
          <div className="profile-section">
            <div className="wrapper">
              <div className="profile-roasts">
                <h1>Best Roasts</h1>
                { comments.map((comment, index) => <ProfileRoast key={ index } comment={ comment } />) }
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
  comments: React.PropTypes.array,
}

export const UserProfile = createContainer(({ params }) => {
  const userId = params.id;
  const user = Meteor.users.findOne(userId);
  const commentsHandle = Meteor.subscribe('all-comments-for-user', userId);
  let comments = Comments.find({ userId }, { sort: { points: -1 } }).fetch();
  comments = _.uniq(comments, (item) => item.roastId );
  return {
    user,
    comments,
  }
}, UserProfileC);
