import React, { Component } from 'react';

import withRoasts from '/imports/decorators/withRoasts';
import RoastShort from '/imports/layout/components/RoastShort';
import SEO from '/imports/util/Seo';

@withRoasts
export default class RoastFeed extends Component {

  // componentDidMount() {
  //   ScrollHandler.resetScrollPosition();
  //   ScrollHandler.infiniteScroll(
  //     _.throttle(function() {
  //       if($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
  //         roastLimit.set(roastLimit.get() + 10);
  //       }
  //     }, 500)
  //   );
  //   this.setState({ initialized: true });
  // }

  // componentWillUnmount() {
  //   ScrollHandler.disableInfiniteScroll();
  // }

  render() {
    const { isLoading, roasts, category } = this.props;
    if(!isLoading) {
      return (
        <div className="roast-list-view">
          <SEO
            schema='DataFeed'
            title={ category === 'Trending' ? undefined : category + ' Roasts' }
            path={ category === 'Trending' ? '' : category.toLowerCase() }
          /> 
          { roasts.map((roast) => {
            return <RoastShort key={roast._id} roast={ roast } />
          })}
        </div>
      );
    } else {
      return (
        // TODO add loading animation
        <p>Loading...</p>
      );
    }
  }
}
