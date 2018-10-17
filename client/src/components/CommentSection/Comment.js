import React, { Component } from 'react';
import Moment from 'moment';

class Comment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editText: '',
      error: null,
      showEditForm: false
    };

    this.onTextChange = this.onTextChange.bind(this);
    this.onSubmitEdit = this.onSubmitEdit.bind(this);
    this.toggleEditFormDisplay = this.toggleEditFormDisplay.bind(this);
    this.onSubmitDelete = this.onSubmitDelete.bind(this);
  }

  onTextChange(e) {
    e.preventDefault();

    const newState = {...this.state};
    newState.editText = e.target.value;
    this.setState(newState);
  }

  onSubmitEdit(e) {
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
        else this.setState({ editText: '', showEditForm: false, error: null });
      });
  }

  onSubmitDelete(e) {
    e.preventDefault();

    fetch(`/comments/${this.props.id}/delete`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: this.props.id
      })
    })
      .then(res => res.json())
      .then(res => {
        if (!res.success) this.setState({ error: res.error });
        else this.setState({ error: null });
      });
  }

  toggleEditFormDisplay() {
    const showEditForm = !this.state.showEditForm;
    this.setState({ showEditForm: showEditForm });
  }

  render() {
    // convert timestamp to Moment.fromNow()
    const timestamp = Moment(this.props.timestamp).fromNow();

    // logic to show/hide edit form
    let editFormClass = 'comment-edit-form';
    if (this.state.showEditForm) {
      editFormClass = 'comment-edit-form show';
    }

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
          <div className={editFormClass}>
            <form onSubmit={this.onSubmitEdit}>
              <input type="text" value={this.state.editText} onChange={this.onTextChange} />
              <button type="submit">Edit</button>
            </form>
          </div>
          <div className="footer-links">
            <div className="comment-edit" onClick={this.toggleEditFormDisplay}>
              Edit
            </div>
            <div className="comment-delete" onClick={this.onSubmitDelete}>
              Delete
            </div>
          </div>
        </div>

      </div>
    );
  }

}

export default Comment;