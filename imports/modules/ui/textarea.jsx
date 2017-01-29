import React, { Component } from 'react';
import { Link } from 'react-router';
import { Bert } from 'meteor/themeteorchef:bert';

export class TextArea extends Component {

  constructor(props) {
    super(props);
    this.state = {
      charsLeft: 500,
    };
  }

  textAreaChange(event) {
    const text = this.textarea.value;
    let charsLeft = 500 - text.length;
    if(charsLeft < 0) {
      charsLeft = 0;
      this.textarea.value = text.substring(0, 500);
    }
    this.setState({ charsLeft });
  }

  submit(event) {
    event.preventDefault();
    const text = this.textarea.value; // TODO: clean text and resolve mentions
    const roastId = this.props.roast ? this.props.roast._id : undefined;
    const commentId = this.props.comment ? this.props.comment.replyTo || this.props.comment._id : undefined;
    Meteor.call('createComment', roastId, commentId, text, (error, result) => {
      if(!error) {
        this.textarea.value = '';
        if(this.props.onCommented) {
          this.props.onCommented();
        }
        Bert.alert('Roasted!', 'success');
      } else {
        Bert.alert('Something went wrong!', 'warning');
      }
    });
  }

  render() {
    if(Meteor.userId()) {
      return (
        <div className="roast-write-comment">
          <textarea
            name="name"
            placeholder="Looks like a placeholder..."
            onChange={ this.textAreaChange.bind(this) }
            ref={(element) => {this.textarea = element;}}>
          </textarea>
          <p className="roast-write-counter">{ this.state.charsLeft }</p>
          <a href="#" className="button flame-button" onClick={ this.submit.bind(this) }><span>Submit</span></a>
        </div>
      );
    } else {
      return (
        <div className="roast-write-comment">
          <p className="login-hint">Please login to write a roast!</p>
        </div>
      );
    }
  }
}

TextArea.propTypes = {
  roast: React.PropTypes.object,
  comment: React.PropTypes.object,
  onCommented: React.PropTypes.func,
}
