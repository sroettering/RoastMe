import React, { Component } from 'react';
import { _ } from 'meteor/underscore';

import { Roasts } from './roasts-collection';
import { Comments } from './comments-collection';

export class Roast extends Component {

  constructor(props) {
    super(props);
    this.renderHeadline = this.renderHeadline.bind(this);
    this.renderRoastImage = this.renderRoastImage.bind(this);
    this.renderSocials = this.renderSocials.bind(this);
    this.renderScore = this.renderScore.bind(this);
    this.renderCommentSection = this.renderCommentSection.bind(this);
  }

  renderHeadline() {
    return (
      <div className="roast-section">
          <div>
              <h2>Hi, I'm {this.props.roast.userName}, #roastme !</h2>
          </div>
      </div>
    );
  }

  renderRoastImage() {
    return (
      <div className="roast-section">
          <div>
              <img className="roast-image" src={this.props.roast.imageUrl} alt="" />
          </div>
      </div>
    );
  }

  renderSocials() {
    return (
      <div className="roast-social-media">
          <ul>
              <li><a href="#" className="button mdi mdi-facebook"><span>Facebook</span></a></li>
              <li><a href="#" className="button mdi mdi-twitter"><span>Twitter</span></a></li>
              <li><a href="#" className="button mdi mdi-google-plus"><span>Google +</span></a></li>
          </ul>
      </div>
    );
  }

  renderScore() {
    return (
      <div className="roast-score">
          <p className="big">{this.props.comments.length}<span className="mdi mdi-fire"></span></p>
          <p className="big">{this.props.roast.totalUpvotes}<span className="mdi mdi-trophy-award"></span></p>
      </div>
    );
  }

  renderCommentSection() {
    return (
      <div className="roast-section">
        { this.props.comments.map((comment) => {
          return
            <div>
                <div className="roast-comment">
                    <div className="roast-comment-profile">
                        <img src="/Fred.jpg" alt="" />
                        <h3>FreakyFreddy</h3>
                        <p className="big">134<span className="mdi mdi-trophy-award"></span></p>
                    </div>

                    <div className="roast-commtent-text">
                        <p>
                            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. At vero eos et accusam et justo duo dolores
                            et ea rebum.
                        </p>
                    </div>

                    <div className="roast-comment-reply">
                        <ul>
                            <li><a href="#" className="button mdi mdi-reply"><span>Reply</span></a></li>
                            <li><a href="#" className="button mdi mdi-arrow-up-bold-circle"><span>Upvote</span></a></li>
                            <li><a href="#" className="button mdi mdi-arrow-down-bold-circle"><span>Downvote</span></a></li>
                        </ul>
                    </div>
                </div>
            </div>;
          })}
      </div>
    );
  }

  render() {
    if(this.props.roast && this.props.comments) {
      return (
        <div className="roast">
            { this.renderHeadline() }
            { this.renderRoastImage() }
            <div className="roast-section">
                <div>
                  { this.renderSocials() }
                  { this.renderScore() }
                </div>
            </div>
            { this.renderCommentSection() }
        </div>
      );
    } else {
      return (
        <h3>Loading...</h3>
      );
    }
  }
}

Roast.propTypes = {
  roast: React.PropTypes.object,
  comments: React.PropTypes.array,
};
