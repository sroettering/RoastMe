import React, { Component } from 'react';

import { ScrollHandler } from '/imports/modules/utility/scroll-handler';

export class New extends Component {

  componentDidMount() {
    ScrollHandler.resetScrollPosition();
  }

  render() {
    const style = {
      color: 'white',
    }
    return (
      <h1 style={style}>New</h1>
    );
  }
}
