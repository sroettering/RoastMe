import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Roasts } from '/imports/modules/roasts/roasts-collection';
import { Comments } from '/imports/modules/roasts/comments-collection';
import { SharedRoast } from '/imports/modules/roasts/shared-roast';
import Loading from '/imports/modules/ui/loading';

export class CommentPageC extends Component {
  render() {
    const { ready, roast, comment } = this.props;
    if(ready) {
      return <SharedRoast roast={ roast } comment={ comment }/>;
    } else {
      return (
        <Loading />
      );
    }
  }
}

CommentPageC.propTypes = {
  ready: React.PropTypes.bool,
  roast: React.PropTypes.object,
  comment: React.PropTypes.object,
};

export const CommentPage = createContainer(({ params }) => {
  const commentId = params.id;
  const subHandle = Meteor.subscribe('comments.forRoast', commentId);
  const comment = Comments.findOne({ _id: commentId });
  const roast = Roasts.findOne();
  return {
    ready: subHandle.ready(),
    roast,
    comment,
  }
}, CommentPageC);
