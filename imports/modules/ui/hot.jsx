import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { ScrollHandler } from '/imports/modules/utility/scroll-handler';

import { Roast } from '/imports/modules/roasts/roast';
import { Roasts } from '/imports/modules/roasts/roasts-collection';

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
        <Roast roast={this.props.roast} comments={[]}/>
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
  return {
    roast,
  }
}, HotC);
