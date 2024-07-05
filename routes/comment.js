const express = require('express'); 
var router = express.Router();
const commentController = require('../controllers/comment');
const { isLoggedIn } = require('../jwt/validate');

router.route('/').get(commentController.getComments)
router.route('/video/:id').get(commentController.getVideoComments)
        
router.route('/user/:id/:pid').patch(isLoggedIn, commentController.updateUserComment)
router.route('/user/:id/:pid').delete(isLoggedIn, commentController.deleteUserComment)
router.route('/user/:id/:pid').post(isLoggedIn, commentController.createComment)

module.exports = router;