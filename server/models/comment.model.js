const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CommentSchema = new Schema({
  commentText: String,
  author: String
});

module.exports = mongoose.model('Comment', CommentSchema);