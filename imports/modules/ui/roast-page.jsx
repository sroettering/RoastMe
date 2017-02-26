import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Roasts } from '/imports/modules/roasts/roasts-collection';
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
};

export const RoastPage = createContainer(({ params }) => {
  const roastId = params.id;
  Meteor.subscribe('roasts.single', roastId);
  const roast = Roasts.findOne(roastId);

  return {
    roast,
  }
}, RoastPageC);
