import React, { Component } from 'react';

import withRoasts from '/imports/decorators/withRoasts';
import RoastShort from '/imports/layout/components/RoastShort';
import SEO from '/imports/util/Seo';
import ScrollListener from '/imports/util/ScrollListener';

@withRoasts
export default class RoastFeed extends Component {

  handleScroll(position, lastPosition) {
    const body = document.body;
    const html = document.documentElement;
    // html.clientHeight = the height of the window
    const height = Math.max(body.scrollHeight, body.offsetHeight, 
                      html.clientHeight, html.scrollHeight, html.offsetHeight );
    if(position > height - html.clientHeight - 100) {
      const { limit } = this.props;
      limit.set(limit.get() + 10);
    }
  }

  render() {
    const { isLoading, limit, roasts, category } = this.props;
    if(!isLoading) {
      return (
        <div className="roast-list-view">
          <ScrollListener listener={ this.handleScroll.bind(this) } />
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
