import React, { Component } from 'react';

export class TabComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tabIndex: 0,
    };
  }

  changeTab(tab) {
    this.setState({ tabIndex: tab });
  }

  render() {
    const { tabHeadings, children } = this.props;
    return (
      <div className="tab-wrapper">
        <div className="wrapper">
          <ul className="tab-nav">
            { tabHeadings.map((heading, i) => {
              const classes = "tab-item" + (i === this.state.tabIndex ? ' active' : '');
              return (
                <li
                  className={ classes }
                  key={ i }
                  onClick={ this.changeTab.bind(this, i) }>
                  { heading }
                </li>
              );
            }) }
          </ul>
        </div>
        <div className="tab-content">
          <div className="wrapper">
            { children[this.state.tabIndex] }
          </div>
        </div>
      </div>
    );
  }

}
