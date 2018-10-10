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
  const comment = new Comment({
    commentText: "Static test comment inserted into DB",
    author: "Jake"
  });

  comment.save(err => {
    if (err) return next(err);

    res.send('Product created successfully');
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
  Comment.findByIdAndUpdate(req.params.id, {$set: req.body}, (err, comment) => {
    if (err) return next(err);

    res.send('Comment updated');
  });
};

// callback fn for the DELETE '/:id/delete' route
exports.comment_delete = function (req, res) {
  Comment.findByIdAndRemove(req.params.id, err => {
    if (err) return next(err);

    res.send('Comment deleted successfully!');
  })
};