import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { ScrollHandler } from '/imports/modules/utility/scroll-handler';

import { Roast } from '/imports/modules/roasts/roast';
import { Roasts } from '/imports/modules/roasts/roasts-collection';
import { Comments } from '/imports/modules/roasts/comments-collection';

class HotC extends Component {

  componentDidMount() {
    ScrollHandler.resetScrollPosition();
  }

  render() {
    const style = {
      color: 'white',
    }
    return (
      <div className="roast-list-view">
        <Roast roast={this.props.roast} comments={this.props.comments}/>
      </div>
    );
  }
}

HotC.propTypes = {
  roast: React.PropTypes.object,
}

export const Hot = createContainer(() => {
  Meteor.subscribe('all-roasts');
  const roast = Roasts.findOne();
  const comments = Comments.find().fetch();
  return {
    roast,
    comments,
  }
}, HotC);
