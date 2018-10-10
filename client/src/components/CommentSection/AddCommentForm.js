import React, { Component } from 'react';

class AddCommentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      commentText: '',
      author: '',
      error: null
    };

    this.onTextChange = this.onTextChange.bind(this);
    this.onAuthorChange = this.onAuthorChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onTextChange(e) {
    e.preventDefault();

    const newState = {...this.state};
    newState.commentText = e.target.value;
    this.setState(newState);
  }

  onAuthorChange(e) {
    e.preventDefault();

    const newState = {...this.state};
    newState.author = e.target.value;
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
      body: JSON.stringify({ author: this.state.author, commentText: this.state.commentText })
    })
      .then(res => res.json())
      .then(res => {
        if (!res.success) this.setState({ error: res.error });
        else this.setState({ author: '', commentText: '', error: null });
      });
  }

  render() {
    return (
      <div className="comment-form">
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            placeholder="Author"
            value={this.state.author}
            onChange={this.onAuthorChange} />
          <input
            type="text"
            placeholder="Comment"
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