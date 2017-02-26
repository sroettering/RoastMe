import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { createContainer } from 'meteor/react-meteor-data';
import { browserHistory, Link } from 'react-router';
import { moment } from 'meteor/momentjs:moment';

import { Roasts } from '/imports/modules/roasts/roasts-collection';
import { Headline } from '/imports/modules/roasts/components/headline';
import { Image } from '/imports/modules/roasts/components/image';

class RoastC extends Component {
  render() {
    const { roast, comment, totalComments } = this.props;
    const createdAt = moment(comment.createdAt).format("DD.MM.YYYY - HH:mm");
    if(roast && comment) {
      return (
        <div className="roast">
          <Headline
            roastUrl={ `/roast/${roast._id}` }
            roastTitle={ roast.title }
            userId={ roast.userId }
            username={ roast.userName } />
          <div className="profile-roast-section">
            <Image
              imageUrl={ roast.imageUrl }
              roastTitle={ roast.title }
              onClick={ this.handleClick.bind(this) } />
          </div>
          <div className="profile-roast-section">
            <div className="roast-comment-text">
              <span>{ createdAt }</span>
              <span className="top-right">{ comment.points }<i className="icon-point"></i></span>
              <p>{ comment.content }</p>
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

  handleClick(event) {
    browserHistory.push(`/roast/${this.props.roast._id}`);
  }
}

RoastC.propTypes = {
  roast: React.PropTypes.object,
  comment: React.PropTypes.object,
  totalComments: React.PropTypes.number,
};

export const ProfileRoast = createContainer(({ comment }) => {
  if(!comment) return {};
  Meteor.subscribe('roasts.single', comment.roastId);
  const roast = Roasts.findOne({ _id: comment.roastId });
  const totalComments = roast ? roast.totalComments : 0;

  return {
    roast,
    totalComments,
  }
}, RoastC);
