const express = require('express'); 
var router = express.Router();

const userController = require('../controllers/user');
const { isLoggedIn } = require('../jwt/validate');
const { upload } = require('../services/user')

router.route('/')
        .get(userController.getUsers)
        .post(upload, userController.createUser)

router.route('/:id')
        .get(userController.getUser)
        .patch(isLoggedIn, upload, userController.updateUser)
        .delete(isLoggedIn, userController.deleteUser)

router.route('/:id/videos').get(userController.getUserVideos)
router.route('/:id/videos').post(isLoggedIn, upload, userController.createUserVideo)

router.route('/:id/videos/:pid').get(userController.getUserVideo)
router.route('/:id/videos/:pid').patch(isLoggedIn, upload, userController.updateUserVideo)
router.route('/:id/videos/:pid').delete(isLoggedIn, userController.deleteUserVideo)

router.route('/:id/videos/like/:pid').patch(isLoggedIn, userController.updateUserLikeVideo)

module.exports = router;