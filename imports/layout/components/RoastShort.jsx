import React, { Component } from 'react';

import withBestComment from '/imports/decorators/withBestComment';
import { Headline } from '/imports/modules/roasts/components/headline';
import { Score } from '/imports/modules/roasts/components/score';
import { Image } from '/imports/modules/roasts/components/image';
//import { CommentSection } from '/imports/modules/roasts/components/comment-section';

@withBestComment
export default class RoastShort extends Component {
  render() {
    const { roast, isLoading } = this.props;
    const { totalComments, totalUpvotes } = roast;
    if(!isLoading) {
      return (
        <div className="roast">
          <Headline
              roastUrl={ `/roast/${roast._id}` }
              roastTitle={ roast.title }
              userId={ roast.userId }
              username={ roast.userName } />
          <Score comments={ totalComments } points={ totalUpvotes } />
          <Image
            imageUrl={ roast.imageUrl }
            roastTitle={ roast.title } />
        </div>
      );
    } else {
      // TODO replace with spinner
      return <p>Loading...</p>
    }
  }
}

// const getDescription = (comment) => {
//   if(comment) {
//     const text = 'Best roast: ' + comment.content;
//     if(text.length > 160) {
//       return text.substring(0, Math.min(text.length, 157)) + '...';
//     }
//     return text;
//   } else {
//     return 'Nothing here yet, be the first to write a roast!';
//   }
// }

// class RoastC extends Component {
//   render() {
//     const { roast, comments, totalComments, totalPoints, single, prev, next } = this.props;
//     if(comments) {
//       return (
//         <div className="roast">
//           <Headline
//             roastUrl={ `/roast/${this.props.roast._id}` }
//             roastTitle={ roast.title }
//             userId={ roast.userId }
//             username={ roast.userName } />
//           <Score comments={ totalComments } points={ totalPoints } />
//           <Image
//             imageUrl={ roast.imageUrl }
//             roastTitle={ roast.title }
//             onClick={ this.handleClick.bind(this) } />
//           <CommentSection comments={ comments } roast={ roast } single={ single } />
//         </div>
//       );
//     } else {
//       return (
//         <Loading />
//       );
//     }
//   }

//   handleClick(event) {
//     if(!this.props.single) browserHistory.push(`/roast/${this.props.roast._id}`);
//   }
// }

// RoastC.propTypes = {
//   roast: React.PropTypes.object,
//   single: React.PropTypes.bool,
//   comments: React.PropTypes.array, // these are not the raw db comments
//   totalComments: React.PropTypes.number,
//   totalPoints: React.PropTypes.number,
//   prev: React.PropTypes.object,
//   next: React.PropTypes.object,
// };

// export const Roast = createContainer(({roast, single}) => {
//   if(!roast) return {};

//   if(single) {
//     Meteor.subscribe('comments.all.roastneighbours', roast._id);
//   } else {
//     Meteor.subscribe('comments.roast.top', roast._id);
//   }

//   let prev;
//   let next;
//   if(single) {
//     prev = Roasts.findOne({
//         _id: { $ne: roast._id },
//         "category.enteredAt": { $gt: roast.category.enteredAt }
//       }, {
//         sort: { "category.enteredAt": 1 },
//       });
//     next = Roasts.findOne({
//         _id: { $ne: roast._id },
//         "category.enteredAt": { $lt: roast.category.enteredAt }
//       }, {
//         sort: { "category.enteredAt": -1 },
//       });
//   }

//   const allComments = Comments.find({ roastId: roast._id }, { sort: { points: -1, createdAt: 1 } }).fetch();
//   const totalComments = roast.totalComments;
//   const totalPoints = roast.totalUpvotes;
//   let comments;
//   if(allComments) {
//     comments = _.filter(allComments, (c) => !c.replyTo);
//     _.each(comments, (comment) => {
//       replies = _.filter(allComments, (c) => !!c.replyTo && c.replyTo === comment._id);
//       comment.replies = _.sortBy(replies, 'createdAt');
//     });
//   }
//   return {
//     comments,
//     totalComments,
//     totalPoints,
//     prev,
//     next,
//   }
// }, RoastC);
