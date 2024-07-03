const express = require('express'); 
var router = express.Router();
const commentController = require('../controllers/comment');

router.route('/')
        .get(commentController.getComments)

router.route('/video/:id')
        .get(commentController.getVideoComments)
        .patch(commentController.createComment)
        

router.route('/user/:id/:pid')
        .get(commentController.getUserComment)
        .patch(commentController.updateUserComment)
        .delete(commentController.deleteUserComment)

module.exports = router;