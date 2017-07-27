import React, { Component } from 'react';

import withBestComment from '/imports/decorators/withBestComment';
import Headline from '/imports/layout/components/Headline';
import Score from '/imports/layout/components/Score';
import Image from '/imports/layout/components/Image';
import SimpleComment from '/imports/layout/components/SimpleComment';

@withBestComment
export default class RoastShort extends Component {
  render() {
    const { roast, comment, isLoading } = this.props;
    if(!isLoading) {
      return (
        <div className="roast">
          <Headline
              roastUrl={ `/roast/${roast._id}` }
              roastTitle={ roast.title }
              userId={ roast.userId }
              username={ roast.userName } />
          <Score comments={ roast.totalComments } points={ roast.totalUpvotes } />
          <Image
            roastId={ roast._id }
            imageUrl={ roast.imageUrl }
            roastTitle={ roast.title } />
          <SimpleComment comment={ comment } roast={ roast } />
        </div>
      );
    } else {
      // TODO replace with spinner
      return <p>Loading...</p>
    }
  }
}
