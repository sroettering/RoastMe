import React, { Component } from 'react';

import { ScrollHandler } from '/imports/modules/utility/scroll-handler';

export class Hot extends Component {

  componentDidMount() {
    ScrollHandler.resetScrollPosition();
  }

  render() {
    const style = {
      color: 'white',
    }
    return (
      <h1 style={style}>Hot</h1>
    );
  }
}
