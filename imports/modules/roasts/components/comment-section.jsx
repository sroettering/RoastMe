import React, { Component } from 'react';
import { _ } from 'meteor/underscore';

import { Comment } from './comment';
import { TextArea } from '/imports/modules/ui/textarea';
import { TabComponent } from '/imports/modules/ui/tab-component';

export class CommentSection extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showAllBest: false,
      showAllNewest: false,
    }
  }

  showAllBestComments() {
    this.setState({ showAllBest: true });
  }

  showAllNewestComments() {
    this.setState({ showAllNewest: true });
  }

  render() {
    const { comments, roast, single } = this.props;
    const hasMore = comments.length > 10;
    let bestComments = _.sortBy(comments, 'points').reverse();
    if(!this.state.showAllBest) {
      bestComments = _.first(bestComments, 10);
    }
    let newestComments = _.sortBy(comments, 'createdAt').reverse();
    if(!this.state.showAllNewest) {
      newestComments = _.first(newestComments, 10);
    }

    if(!single) {
      return (
        <div className="roast-section">
          { comments.map((comment, index) => <Comment key={ index } single={ single } comment={ comment } roast={ roast } /> ) }
        </div>
      );
    } else {
      return (
        <div className="roast-section">
          <TabComponent tabHeadings={ ['Best', 'Newest'] }>
            <div className="tab best-comments">
              <TextArea roast={ roast } />
              { bestComments.map((comment, index) => <Comment key={ index } single={ single } comment={ comment } roast={ roast } /> ) }
              { !this.state.showAllBest && hasMore ?
                <button
                  className="more-roasts-button"
                  onClick={ this.showAllBestComments.bind(this) }>
                  I want more roasts!
                </button> : ''
              }
            </div>
            <div className="tab newest-comments">
              <TextArea roast={ roast } />
              { newestComments.map((comment, index) => <Comment key={ index } single={ single } comment={ comment } roast={ roast } /> ) }
              { !this.state.showAllNewest && hasMore ?
                <button
                  className="more-roasts-button"
                  onClick={ this.showAllNewestComments.bind(this) }>
                  I want more roasts!
                </button> : ''
              }
            </div>
          </TabComponent>
        </div>
      );
    }
  }
};

CommentSection.propTypes = {
  comments: React.PropTypes.array,
  roast: React.PropTypes.object,
  single: React.PropTypes.bool,
};
