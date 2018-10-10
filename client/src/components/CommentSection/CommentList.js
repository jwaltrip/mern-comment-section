import React, { Component } from 'react';

import './Comment.css';

import Comment from "./Comment";
import AddCommentForm from './AddCommentForm';

class CommentList extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  render() {
    return (
      <div className="comment-list">
        <h2>Comments</h2>
        <Comment/>
        <Comment/>
        <Comment/>
        <AddCommentForm/>
      </div>
    );
  }
}

export default CommentList;