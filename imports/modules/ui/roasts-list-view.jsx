import React, { Component } from 'react';
import { ReactiveVar } from 'meteor/reactive-var';

import { ScrollHandler } from '/imports/modules/utility/scroll-handler';
import { Roast } from '/imports/modules/roasts/roast';

export const roastLimit = new ReactiveVar(2);

export class RoastsListView extends Component {

  componentDidMount() {
    roastLimit.set(2);
    ScrollHandler.resetScrollPosition();
    ScrollHandler.infiniteScroll(
      _.throttle(function() {
        if($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
          roastLimit.set(roastLimit.get() + 2);
        }
      }, 500)
    );
  }

  componentWillUnmount() {
    ScrollHandler.disableInfiniteScroll();
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

RoastsListView.propTypes = {
  roast: React.PropTypes.object,
}
