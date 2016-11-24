import React, { Component } from 'react';

export class TextArea extends Component {

  submit(event) {
    event.preventDefault();
    const text = this.textarea.value; // TODO: clean text and resolve mentions
    const roastId = this.props.roast ? this.props.roast._id : undefined;
    const commentId = this.props.comment ? this.props.comment._id : undefined;
    Meteor.call('createComment', roastId, commentId, text);
  }

  render() {
    return (
      <div className="roast-write-comment">
        <textarea name="name" placeholder="Write comment ..." ref={(element) => {this.textarea = element;}}></textarea>
        <a href="#" className="mdi mdi-emoticon"></a>
        <p className="roast-write-counter">64</p>
        <a href="#" className="button mdi mdi-send" onClick={ this.submit.bind(this) }><span>Submit</span></a>
      </div>
    );
  }
}

TextArea.propTypes = {
  roast: React.PropTypes.object,
  comment: React.PropTypes.object,
}
