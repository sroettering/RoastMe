import React, { Component } from 'react';

import { Comment } from './comment';

export class Replies extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showAll: false,
    };
  }

  showAllReplies() {
    this.setState({ showAll: true });
  }

  render() {
    const { replies, roast } = this.props;
    let allReplies = replies;
    const showButton = !this.state.showAll && replies.length > 1;
    if(showButton) {
      allReplies = [replies[0]];
    }
    return (
      <div className="roast-comment-answers">
        { allReplies.map((reply, index) => {
          return (
            <div className="roast-answer" key={ index }>
              <Comment comment={ reply } roast={ roast } single={ true } />
            </div>
          );
        }) }
        { showButton ?
          <div className="roast-answer">
            <button
              className="more-replies-button"
              onClick={ this.showAllReplies.bind(this) }>
              Load more replies...
            </button>
          </div> : ''
        }

      </div>
    );
  }
};

Replies.propTypes = {
  replies: React.PropTypes.array,
  roast: React.PropTypes.object,
};
