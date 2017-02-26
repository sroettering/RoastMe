import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Roasts } from '/imports/modules/roasts/roasts-collection';
import { Roast } from '/imports/modules/roasts/roast';
import Loading from '/imports/modules/ui/loading';

export class RoastPageC extends Component {
  render() {
    const { ready, roast } = this.props;
    if(ready) {
      return <Roast roast={ roast } single={ true }/>;
    } else {
      return (
        <Loading />
      );
    }
  }
}

RoastPageC.propTypes = {
  ready: React.PropTypes.bool,
  roast: React.PropTypes.object,
};

export const RoastPage = createContainer(({ params }) => {
  const roastId = params.id;
  const subHandle = Meteor.subscribe('roasts.single', roastId);
  const roast = Roasts.findOne(roastId);
  return {
    ready: subHandle.ready(),
    roast,
  }
}, RoastPageC);
