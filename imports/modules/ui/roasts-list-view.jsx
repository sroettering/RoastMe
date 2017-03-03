import React, { Component } from 'react';
import { ReactiveVar } from 'meteor/reactive-var';
import Spinner from 'react-spinkit';

import { ScrollHandler } from '/imports/modules/utility/scroll-handler';
import { Roast } from '/imports/modules/roasts/roast';
import Loading from '/imports/modules/ui/loading';

export const roastLimit = new ReactiveVar(10);

export class RoastsListView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      initialized: false,
    };
  }

  componentDidMount() {
    ScrollHandler.resetScrollPosition();
    ScrollHandler.infiniteScroll(
      _.throttle(function() {
        if($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
          roastLimit.set(roastLimit.get() + 10);
        }
      }, 500)
    );
    this.setState({ initialized: true });
  }

  componentWillUnmount() {
    ScrollHandler.disableInfiniteScroll();
  }

  render() {
    const { ready, roasts, hasMore } = this.props;
    if(ready || this.state.initialized) {
      return (
        <div className="roast-list-view">
          { roasts.map((roast) => {
            return <Roast key={roast._id} roast={roast} single={false}/>
          })}
          { hasMore ? <Spinner spinnerName="circle" className="light" noFadeIn/> : '' }
        </div>
      );
    } else {
      return (
        <Loading />
      );
    }
  }
}

RoastsListView.propTypes = {
  ready: React.PropTypes.bool,
  roasts: React.PropTypes.array,
  hasMore: React.PropTypes.bool,
}
