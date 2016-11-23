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
    if(this.props.roasts) {
      return (
        <div className="roast-list-view">
          { this.props.roasts.map((roast) => {
            return <Roast key={roast._id} roast={roast} single={false}/>
          })}
        </div>
      );
    } else {
      return (
        <h3>Loading...</h3>
      );
    }
  }
}

HotC.propTypes = {
  roast: React.PropTypes.object,
  comments: React.PropTypes.array,
}

export const Hot = createContainer(() => {
  Meteor.subscribe('all-roasts');
  const roasts = Roasts.find().fetch();
  return {
    roasts,
  }
}, HotC);
