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
import Loading from '/imports/modules/ui/loading';
import SEO from '/imports/modules/utility/seo';

const getDescription = (comment) => {
  if(comment) {
    const text = 'Best roast: ' + comment.content;
    if(text.length > 160) {
      return text.substring(0, Math.min(text.length, 157)) + '...';
    }
    return text;
  } else {
    return 'Nothing here yet, be the first to write a roast!';
  }
}

class RoastC extends Component {
  render() {
    const { roast, comments, totalComments, totalPoints, single, prev, next } = this.props;
    if(comments) {
      return (
        <div className="roast">
          { single ? <RoastNavigation prev={ prev } next={ next } /> : '' }
          { single ?
            <SEO
              schema='Article'
              title={ roast.title }
              description={ getDescription(comments[0]) }
              roastImg={ roast.imageUrl }
              path={ 'roast/' + roast._id }
              contentType='article'
            /> : '' }
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
        <Loading />
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
    Meteor.subscribe('comments.all.roastneighbours', roast._id);
  } else {
    Meteor.subscribe('comments.roast.top', roast._id);
  }

  let prev;
  let next;
  if(single) {
    prev = Roasts.findOne({
        _id: { $ne: roast._id },
        "category.enteredAt": { $gt: roast.category.enteredAt }
      }, {
        sort: { "category.enteredAt": 1 },
      });
    next = Roasts.findOne({
        _id: { $ne: roast._id },
        "category.enteredAt": { $lt: roast.category.enteredAt }
      }, {
        sort: { "category.enteredAt": -1 },
      });
  }

  const allComments = Comments.find({ roastId: roast._id }, { sort: { points: -1, createdAt: 1 } }).fetch();
  const totalComments = roast.totalComments;
  const totalPoints = roast.totalUpvotes;
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
