import React from 'react';

const Comment = (props) => {
  return (
    <div className="comment">
      <div className="comment-text">
        {props.commentText}
      </div>
      <div className="comment-author">
        {props.author}
      </div>
    </div>
  );
};

export default Comment;