import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import EventListener from 'react-event-listener';
import Hammer from 'hammerjs';

export default class RoastNavigation extends Component {

  componentDidMount() {
    this.hammer = new Hammer(window, {});
    this.hammer.on('swipe', (event) => {
      if(event.direction == 4) {
        this.prevRoast();
      } else if(event.direction == 2) {
        this.nextRoast();
      }
    });
  }

  componentWillUnmount() {
    this.hammer.off('swipe');
  }

  handleKeyUp(event) {
    if(event.key == "j" || event.key == "ArrowLeft") {
      this.prevRoast();
    } else if(event.key == "k" || event.key == "ArrowRight") {
      this.nextRoast();
    }
  }

  prevRoast() {
    browserHistory.push(`/roast/${this.props.prev._id}`)
  }

  nextRoast() {
    browserHistory.push(`/roast/${this.props.next._id}`);
  }

  render() {
    const { prev, next } = this.props;
    return (
      <div className="roast-section">
        <EventListener target="window" onKeyUp={ this.handleKeyUp.bind(this) } />
        <button
          className="arrow-button"
          disabled={ !next }
          onClick={ this.nextRoast.bind(this) }>
          next
        </button>
        <button
          className="arrow-button"
          disabled={ !prev }
          onClick={ this.prevRoast.bind(this) }>
          back
        </button>
      </div>
    );
  }
}

RoastNavigation.propTypes = {
  prev: React.PropTypes.object,
  next: React.PropTypes.object,
};
