const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/* TODO update schema to

  parentCommentId:	Number,
  commentText:	String,
  author:	String,
  numLikes:	Number,
  posted:	Number,
  timestamp:	Number

 */

// old schema
// let CommentSchema = new Schema({
//   commentText: String,
//   author: String,
//   timestamp: Number
// });

let CommentSchema = new Schema({
  parentCommentId:	Number,
  commentText:	String,
  author:	String,
  numLikes:	{ type: Number, default: 0 },
  posted:	Number,
  timestamp:	Number
});

module.exports = mongoose.model('Comment', CommentSchema);