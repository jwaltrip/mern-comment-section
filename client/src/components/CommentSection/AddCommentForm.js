import React, { Component } from 'react';

class AddCommentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      commentText: ''
    };

    this.onTextChange = this.onTextChange.bind(this);
  }

  onTextChange(e) {
    e.preventDefault();

    const newState = {...this.state};
    newState.commentText = e.target.value;
    this.setState(newState);
  }

  render() {
    return (
      <div className="comment-form">
        <form>
          <input type="text" onChange={this.onTextChange} />
          <button className="submit-button">Submit Comment</button>
        </form>
      </div>
    );
  }
}

export default AddCommentForm;