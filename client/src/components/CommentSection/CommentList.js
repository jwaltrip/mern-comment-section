import React, { Component } from 'react';

import './Comment.css';

import Comment from "./Comment";
import AddCommentForm from './AddCommentForm';

class CommentList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      comments: []
    }
  }

  componentDidMount() {
    fetch('/api/comments')
      .then(res => res.json())
      .then(comments => {
        this.setState({ comments: comments });
      });
  }

  render() {
    return (
      <div>
        <h2>Comments</h2>
        <div className="comment-list">

          {this.state.comments.map((comment, idx) => {
            return <Comment
                    key={comment.id}
                    commentText={comment.commentText}
                    author={comment.author}
                  />
          })}

          <AddCommentForm/>
        </div>
      </div>
    );
  }
}

export default CommentList;