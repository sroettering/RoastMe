import React, { Component } from 'react';
import { _ } from 'meteor/underscore';

export default class ScrollListener extends Component {

  constructor(props) {
    super(props);
    this.state = {
      position: 0
    };
    this.trackPosition = _.throttle(this.trackPosition.bind(this), 500);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.trackPosition);
    document.body.scrollTop = 0;
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.trackPosition);
  }

  trackPosition(event) {
    const position = Math.max(event.srcElement.body.scrollTop, 0);
    const { listener } = this.props;
    if(listener && typeof listener === 'function') {
      listener(position, this.state.position);
    }
    this.setState({ position });
  }

  render() {
    return null;
  }
}