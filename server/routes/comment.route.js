const express = require('express');
const router = express.Router();

// require the controllers (which he haven't created yet)
const comment_controller = require('../controllers/comment.controller');

// a simple test url to check that all of our files are communicating properly
router.get('/test', comment_controller.test);

// GET - get all comments and id's
router.get('/all', comment_controller.comment_get_all);

// GET - get a comment by id
router.get('/:id', comment_controller.comment_details);

// POST - add a comment
router.post('/add', comment_controller.comment_add);

// PUT - update a comment by id
router.put('/:id/update', comment_controller.comment_update);

// DELETE - delete a comment by id
router.delete('/:id/delete', comment_controller.comment_delete);

module.exports = router;