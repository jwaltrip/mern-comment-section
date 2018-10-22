import React, { Component } from 'react';

import './Comment.css';

import Comment from "./Comment";
import AddCommentForm from './AddCommentForm';
import SocialCard from "./SocialCard";

class CommentList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      comments: []
    };
    this.pollInterval = null;

    this.loadCommentsFromServer = this.loadCommentsFromServer.bind(this);
  }

  componentDidMount() {
    this.loadCommentsFromServer();
    // poll backend server for comments every 2 seconds
    if (!this.pollInterval) {
      this.pollInterval = setInterval(this.loadCommentsFromServer, 2000);
    }
  }

  componentWillUnmount() {
    if (this.pollInterval) clearInterval(this.pollInterval);
    this.pollInterval = null;
  }

  loadCommentsFromServer() {
    fetch('/comments/all')
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

          {/*this.state.comments.map((comment, idx) => {
            return <Comment
                    key={idx}
                    id={comment._id}
                    commentText={comment.commentText}
                    timestamp={comment.timestamp}
                    author={comment.author}
                  />
          })*/}

          {this.state.comments.map((comment, idx) => {
            return <SocialCard
                    key={idx}
                    id={comment._id}
                    commentText={comment.commentText}
                    timestamp={comment.timestamp}
                    author={comment.author}
                    numComments={this.numComments}
                    numRetweets={this.numRetweets}
                    numLikes={this.numLikes}
                  />
          })}

          <AddCommentForm/>
        </div>
      </div>
    );
  }
}

export default CommentList;