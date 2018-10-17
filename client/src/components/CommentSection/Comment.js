import React, { Component } from 'react';
import Moment from 'moment';

class Comment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editText: '',
      error: null
    };

    this.onTextChange = this.onTextChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onTextChange(e) {
    e.preventDefault();

    const newState = {...this.state};
    newState.editText = e.target.value;
    this.setState(newState);
  }

  onSubmit(e) {
    e.preventDefault();

    fetch(`/comments/${this.props.id}/update`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: this.props.id,
        commentText: this.state.editText,
        timestamp: Date.now()
      })
    })
      .then(res => res.json())
      .then(res => {
        if (!res.success) this.setState({ error: res.error });
        else this.setState({ editText: '', error: null });
      });
  }

  render() {
    // convert timestamp to Moment.fromNow()
    const timestamp = Moment(this.props.timestamp).fromNow();



    return (
      <div className="comment">
        <div className="comment-header">
          <div className="comment-author">
            {this.props.author}
          </div>
          <div className="comment-timestamp">
            {timestamp}
          </div>
        </div>
        <div className="comment-text">
          {this.props.commentText}
        </div>
        <div className="comment-footer">
          <div className="comment-edit-form">
            <form onSubmit={this.onSubmit}>
              <input type="text" value={this.state.editText} onChange={this.onTextChange} />
              <button type="submit">Edit</button>
            </form>
          </div>
          <div className="comment-edit">
            Edit
          </div>
        </div>

      </div>
    );
  }

}

export default Comment;