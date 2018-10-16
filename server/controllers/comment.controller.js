const Comment = require('../models/comment.model');

// simple version, without validation or sanitation
// callback function for the GET '/test' route
exports.test = function (req, res) {
  res.send('Greetings from the Test controller!');
};

// callback fn for the GET '/all' route
exports.comment_get_all = function (req, res) {
  Comment.find({}, (err, comments) => {
    if (err) return next(err);

    res.send(comments);
  });
};

// callback function for the POST '/add' route
exports.comment_add = function (req, res) {
  const comment = new Comment();
  // get author and commentText from url body
  const { author, commentText, timestamp } = req.body;
  // if either author or commentText is not present, res w error
  if (!author || !commentText || !timestamp) {
    return res.json({
      success: false,
      error: "You must provide an author, commentText, and timestamp"
    });
  }

  comment.author = author;
  comment.commentText = commentText;
  comment.timestamp = timestamp;

  comment.save(err => {
    if (err) return next(err);

    return res.json({ success: true });
  })
};

// callback function for the GET '/:id' route
exports.comment_details = function (req, res) {
  Comment.findById(req.params.id, (err, comment) => {
    if (err) return next(err);

    res.send(comment);
  });
};

// callback function for the PUT update '/:id/update' route
exports.comment_update = function (req, res) {
  const comment = new Comment();
  // get author and commentText from url body
  const { author, commentText, timestamp, id } = req.body;
  // if either author or commentText is not present, res w error
  if (!author || !commentText || !timestamp || !id) {
    return res.json({
      success: false,
      error: "You must provide an author, commentText, and timestamp"
    });
  }

  comment.author = author;
  comment.commentText = commentText;
  comment.timestamp = timestamp;

  comment.findByIdAndUpdate(id, {$set: req.body}, (err, comment) => {
    if (err) return next(err);

    return res.json({ success: true });
  });

  // Comment.findByIdAndUpdate(req.params.id, {$set: req.body}, (err, comment) => {
  //   if (err) return next(err);
  //
  //   res.send('Comment updated');
  // });
};

// callback fn for the DELETE '/:id/delete' route
exports.comment_delete = function (req, res) {
  Comment.findByIdAndRemove(req.params.id, err => {
    if (err) return next(err);

    res.send('Comment deleted successfully!');
  })
};