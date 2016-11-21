import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Roasts } from './roasts-collection';
import { Comments } from './comments-collection';
import { Roast } from './roast';

export class RoastPageC extends Component {
  render() {
    if(this.props.roast) {
      return <Roast roast={ this.props.roast } comments={ this.props.comments }/>;
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
