import React, { Component } from 'react';
import { browserHistory, Link } from 'react-router';

import { Headline } from '/imports/modules/roasts/components/headline';
import { Score } from '/imports/modules/roasts/components/score';
import { Image } from '/imports/modules/roasts/components/image';
import { CommentSection } from '/imports/modules/roasts/components/comment-section';
import Loading from '/imports/modules/ui/loading';
import SEO from '/imports/modules/utility/seo';

const getDescription = (comment) => {
  if(comment) {
    const text = comment.userName + ' roasted: ' + comment.content;
    if(text.length > 160) {
      return text.substring(0, Math.min(text.length, 157)) + '...';
    }
    return text;
  } else {
    return 'Nothing here yet, be the first to write a roast!';
  }
}

export class SharedRoast extends Component {
  render() {
    const { roast, comment } = this.props;
    const { totalComments, totalUpvotes } = roast;
    return (
      <div className="roast">
        <SEO
          schema='Article'
          title={ roast.title }
          description={ getDescription(comment) }
          roastImg={ roast.imageUrl }
          path={ '/c/' + comment._id }
          contentType='article'
        />
        <Headline
          roastUrl={ `/roast/${roast._id}` }
          roastTitle={ roast.title }
          userId={ roast.userId }
          username={ roast.userName } />
        <Score comments={ totalComments } points={ totalUpvotes } />
        <Image
          imageUrl={ roast.imageUrl }
          roastTitle={ roast.title }
          onClick={ this.handleClick.bind(this) } />
        <CommentSection comments={ [comment] } roast={ roast } single={ false } />
      </div>
    );
  }

  handleClick(event) {
    if(!this.props.single) browserHistory.push(`/roast/${this.props.roast._id}`);
  }
}

SharedRoast.propTypes = {
  roast: React.PropTypes.object,
  comment: React.PropTypes.object,
};
