import React, { Component } from 'react';

export class Roast extends Component {
  render() {
    return (
      <div className="roast">
          <div className="roast-section">
              <div>
                  <h2>Headline of this Roast</h2>
              </div>
          </div>

          <div className="roast-section">
              <div>
                  <img className="roast-image" src="/Fred.jpg" alt="" />
              </div>
          </div>

          <div className="roast-section">
              <div>
                  <div className="roast-social-media">
                      <ul>
                          <li><a href="#" className="button mdi mdi-facebook"><span>Facebook</span></a></li>
                          <li><a href="#" className="button mdi mdi-twitter"><span>Twitter</span></a></li>
                          <li><a href="#" className="button mdi mdi-google-plus"><span>Google +</span></a></li>
                      </ul>
                  </div>

                  <div className="roast-score">
                      <p className="big">12<span className="mdi mdi-fire"></span></p>
                      <p className="big">345<span className="mdi mdi-trophy-award"></span></p>
                  </div>
              </div>
          </div>

          <div className="roast-section">
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
              </div>
          </div>
      </div>
    );
  }
}

Roast.propTypes = {

}
