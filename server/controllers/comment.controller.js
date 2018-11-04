const Comment = require('../models/comment.model');

// simple version, without validation or sanitation
// callback function for the GET '/test' route
exports.test = function (req, res) {
  res.send('Greetings from the Test controller!');
};

// callback fn for the GET '/all' route
exports.comment_get_all = function (req, res) {
  // exports.find_parent_comment_id();

  Comment.find({}, (err, comments) => {
    if (err) return next(err);

    res.send(comments);
  });
};

exports.find_parent_comment_id = function (req, res) {
  // check to  see if db var is available here
  Comment.find({}).sort({"timestamp":-1}).limit(1).then(comment => {
    console.log('latest comment', comment);
  });
};

// callback function for the POST '/add' route
/*TODO on add top level comment, increment parentCommentId +1 will need to get last inserted parent comment
 */
exports.comment_add = function (req, res) {
  // get largest previous maxParentID
  (async function() {
    const oldMaxParentID = await exports.comment_find_greatest_parent_id();

    console.log('max parent id', oldMaxParentID);

    const comment = new Comment();
    // get author and commentText from url body
    const { author, commentText, posted, timestamp } = req.body;
    // if either author or commentText is not present, res w error
    if (!oldMaxParentID || !author || !commentText || !posted || !timestamp) {
      return res.json({
        success: false,
        error: "You must provide an maxParentID, author, commentText, posted, and timestamp"
      });
    }

    comment.parentCommentId = oldMaxParentID + 1;
    comment.author = author;
    comment.commentText = commentText;
    comment.posted = posted;
    comment.timestamp = timestamp;

    comment.save(err => {
      if (err) return res.json({ success: false, error: err });

      return res.json({ success: true });
    });
  })();

};

// TODO create comment_add_reply route

// callback function for the GET '/:id' route
exports.comment_details = function (req, res) {
  Comment.findById(req.params.id, (err, comment) => {
    if (err) return next(err);

    res.send(comment);
  });
};

// callback function for the PUT update '/:id/update' route
exports.comment_update = function (req, res) {
  // const comment = new Comment();
  // get author and commentText from url body
  const { commentText, timestamp, id } = req.body;
  // if either author or commentText is not present, res w error
  if (!commentText || !timestamp || !id) {
    return res.json({
      success: false,
      error: "You must provide an commentText, timestamp, and id"
    });
  }

  Comment.findOneAndUpdate({ _id: id }, {$set: req.body}, (err, comment) => {
    // if (err) return next(err);
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
};

// callback fn for the DELETE '/:id/delete' route
exports.comment_delete = function (req, res) {
  Comment.findByIdAndRemove(req.params.id, err => {
    // if (err) return next(err);
    if (err) return res.json({ success: false, error: err });
    res.json({ success: true });
  })
};

// callback function for the PUT update '/:id/update' route
exports.comment_update_likes = function (req, res) {
  // const comment = new Comment();
  // get author and commentText from url body
  const { numLikes, id } = req.body;
  // if either author or commentText is not present, res w error
  if (!numLikes || !id) {
    return res.json({
      success: false,
      error: "You must provide an commentText, timestamp, and id"
    });
  }

  Comment.findOneAndUpdate({ _id: id }, {$inc: req.body}, (err, comment) => {
    // if (err) return next(err);
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
};

// TODO create fn to find greatest parentId num
// finds max parent id for new comment insertion
exports.comment_find_greatest_parent_id = function () {
  return Comment.find({})
    .sort({"parentCommentId": -1})
    .limit(1)
    .exec()
    .then((comment) => {
      // else return res.json({ success: true, maxParentId: parentId });
      console.log('max parent id comment', comment[0].parentCommentId);
      return comment[0].parentCommentId;
    })
    .catch(err => {
      return err;
    });

};