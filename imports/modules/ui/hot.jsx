import React, { Component } from 'react';

import { ScrollHandler } from '/imports/modules/utility/scroll-handler';

import { Roast } from '/imports/modules/roasts/roast';

export class Hot extends Component {

  componentDidMount() {
    ScrollHandler.resetScrollPosition();
  }

  render() {
    const style = {
      color: 'white',
    }
    return (
      <div className="roast-list-view">
        <Roast />
      </div>
    );
  }
}
