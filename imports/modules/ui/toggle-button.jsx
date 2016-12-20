import React, { Component } from 'react';
import classNames from 'classnames';

export class ToggleButton extends Component {

  handleClick(event) {
    this.props.callback();
  }

  render() {
    const { callback, enabled, toggled, children } = this.props;
    const classes = classNames({
      'toggle-button': true,
      'toggled': toggled,
    });
    return (
      <button className={ classes } onClick={ callback } disabled={ !enabled }>
        { children }
      </button>
    );
  }
}

ToggleButton.propTypes = {
  children: React.PropTypes.element,
  toggled: React.PropTypes.bool,
  enabled: React.PropTypes.bool,
  callback: React.PropTypes.func,
}
