import React, { Component } from 'react';
import classNames from 'classnames';

export class ToggleButton extends Component {
  
  handleClick(event) {
    this.props.callback();
  }

  render() {
    const classes = classNames(this.props.icon, {
      'toggle-button': true,
      'toggled': this.props.toggled,
    });
    return (
      <button className={ classes } onClick={ this.handleClick.bind(this) } disabled={ !this.props.enabled }>
        { this.props.children }
      </button>
    );
  }
}

ToggleButton.propTypes = {
  children: React.PropTypes.element,
  icon: React.PropTypes.string,
  toggled: React.PropTypes.bool,
  enabled: React.PropTypes.bool,
  callback: React.PropTypes.func,
}
