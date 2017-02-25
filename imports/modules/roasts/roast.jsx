import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { createContainer } from 'meteor/react-meteor-data';
import { browserHistory, Link } from 'react-router';

import { Roasts } from './roasts-collection';
import { Comments } from './comments-collection';
import { upvote } from './voting';
import { downvote } from './voting';
import { ToggleButton } from '/imports/modules/ui/toggle-button';
import { Headline } from '/imports/modules/roasts/components/headline';
import { Score } from '/imports/modules/roasts/components/score';
import { Image } from '/imports/modules/roasts/components/image';
import { CommentSection } from '/imports/modules/roasts/components/comment-section';
import RoastNavigation from '/imports/modules/roasts/components/roast-navigation';

class RoastC extends Component {
  render() {
    const { roast, comments, totalComments, totalPoints, single, prev, next } = this.props;
    if(roast && comments) {
      return (
        <div className="roast">
          { single ? <RoastNavigation prev={ prev } next={ next } /> : '' }
          <Headline
            roastUrl={ `/roast/${this.props.roast._id}` }
            roastTitle={ roast.title }
            userId={ roast.userId }
            username={ roast.userName } />
          <Score comments={ totalComments } points={ totalPoints } />
          <Image
            imageUrl={ roast.imageUrl }
            roastTitle={ roast.title }
            onClick={ this.handleClick.bind(this) } />
          <CommentSection comments={ comments } roast={ roast } single={ single } />
        </div>
      );
    } else {
      return (
        <h3>Loading...</h3>
      );
    }
  }

  handleClick(event) {
    if(!this.props.single) browserHistory.push(`/roast/${this.props.roast._id}`);
  }
}

RoastC.propTypes = {
  roast: React.PropTypes.object,
  single: React.PropTypes.bool,
  comments: React.PropTypes.array, // these are not the raw db comments
  totalComments: React.PropTypes.number,
  totalPoints: React.PropTypes.number,
  prev: React.PropTypes.object,
  next: React.PropTypes.object,
};

export const Roast = createContainer(({roast, single}) => {
  if(!roast) return {};
  if(single) {
    Meteor.subscribe('all-comments-and-neighbours-for-roast', roast._id);
  } else {
    Meteor.subscribe('top-comments-for-roast', roast._id);
  }

  let prev;
  let next;
  if(single) {
    prev = Roasts.findOne({
        _id: { $ne: roast._id },
        "category.enteredAt": { $lt: roast.category.enteredAt }
      }, {
        sort: { "category.enteredAt": -1 },
      });
    next = Roasts.findOne({
        _id: { $ne: roast._id },
        "category.enteredAt": { $gt: roast.category.enteredAt }
      }, {
        sort: { "category.enteredAt": 1 },
      });
  }

  const allComments = Comments.find({ roastId: roast._id }, { sort: { points: -1, createdAt: 1 } }).fetch();
  const totalComments = roast.totalComments;
  const totalPoints = _.reduce(allComments, (mem, c) => mem + c.points, 0);
  let comments;
  if(allComments) {
    comments = _.filter(allComments, (c) => !c.replyTo);
    _.each(comments, (comment) => {
      replies = _.filter(allComments, (c) => !!c.replyTo && c.replyTo === comment._id);
      comment.replies = _.sortBy(replies, 'createdAt');
    });
  }
  return {
    comments,
    totalComments,
    totalPoints,
    prev,
    next,
  }
}, RoastC);
