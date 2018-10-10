import React, { Component } from 'react';

class AddCommentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      commentText: '',
      error: null
    };

    this.onTextChange = this.onTextChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onTextChange(e) {
    e.preventDefault();

    const newState = {...this.state};
    newState.commentText = e.target.value;
    this.setState(newState);
  }

  onSubmit(e) {
    e.preventDefault();

    fetch('/comments/add', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ author: "Jake", commentText: this.state.commentText })
    })
      .then(res => res.json())
      .then(res => {
        if (!res.success) this.setState({ error: res.error });
        else this.setState({ commentText: '', error: null });
      });
  }

  render() {
    return (
      <div className="comment-form">
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            value={this.state.commentText}
            onChange={this.onTextChange} />
          <button
            type="submit"
            className="submit-button">Submit Comment</button>
        </form>
      </div>
    );
  }
}

export default AddCommentForm;