import React, { Component } from 'react';

import './Comment.css';

import Comment from "./Comment";
import AddCommentForm from './AddCommentForm';
import SocialCard from "./SocialCard";
import CommentReply from "./CommentReply";

class CommentList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      comments: []
    };
    this.pollInterval = null;

    this.loadCommentsFromServer = this.loadCommentsFromServer.bind(this);
    this.getNumCommentReplies = this.getNumCommentReplies.bind(this);
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
    fetch('/comments/all_nested')
      .then(res => res.json())
      .then(comments => {
        this.setState({ comments: comments });
      });
  }

  getNumCommentReplies(parentId) {
    const filteredRepliesByParent = this.state.comments.filter((comment, idx) => {
      return comment.parentCommentId === parentId && comment.isReply;
    });

    return filteredRepliesByParent.length;
  }

  render() {
    return (
      <div>
        <h2>Comments</h2>
        <div className="comment-list">

          {this.state.comments.map((comment, idx) => {
            // if top level comment, return SocialCard
            if (!comment.isReply) {
              return <SocialCard
                key={idx}
                id={comment._id}
                parentCommentId={comment.parentCommentId}
                commentText={comment.commentText}
                posted={comment.posted}
                timestamp={comment.timestamp}
                author={comment.author}
                numComments={this.getNumCommentReplies(comment.parentCommentId)}
                numRetweets={this.numRetweets}
                numLikes={comment.numLikes}
              />
            }
            // if comment reply, return CommentReply
            else {
              return <CommentReply
                key={idx}
                id={comment._id}
                parentCommentId={comment.parentCommentId}
                commentText={comment.commentText}
                posted={comment.posted}
                timestamp={comment.timestamp}
                author={comment.author}
                numComments={this.numComments}
                numRetweets={this.numRetweets}
                numLikes={comment.numLikes}
              />
            }

          })}

          <AddCommentForm />
        </div>
      </div>
    );
  }
}

export default CommentList;