import React from 'react';
import Moment from 'moment';

const Comment = (props) => {
  // convert timestamp to Moment.fromNow()
  const timestamp = Moment(props.timestamp).fromNow();



  return (
    <div className="comment">
      <div className="comment-header">
        <div className="comment-author">
          {props.author}
        </div>
        <div className="comment-timestamp">
          {timestamp}
        </div>
      </div>
      <div className="comment-text">
        {props.commentText}
      </div>

    </div>
  );
};

export default Comment;