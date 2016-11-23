import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Roasts } from '/imports/modules/roasts/roasts-collection';
import { Comments } from '/imports/modules/roasts/comments-collection';
import { Roast } from '/imports/modules/roasts/roast';

export class RoastPageC extends Component {
  render() {
    if(this.props.roast) {
      return <Roast roast={ this.props.roast } single={ true }/>;
    } else {
      return (
        <div>Loading...</div>
      );
    }
  }
}

RoastPageC.propTypes = {
  roast: React.PropTypes.object,
  comments: React.PropTypes.array,
};

export const RoastPage = createContainer(({ params }) => {
  const roastId = params.id;
  Meteor.subscribe('single-roast', roastId);
  Meteor.subscribe('all-comments-for-roast', roastId);
  const roast = Roasts.findOne(roastId);
  const comments = Comments.find({roastId: roastId}).fetch();

  return {
    roast,
    comments,
  }
}, RoastPageC);
