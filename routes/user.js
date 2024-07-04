const express = require('express'); 
var router = express.Router();

const userController = require('../controllers/user');
const { isLoggedIn } = require('../jwt/validate');

router.route('/')
        .get(userController.getUsers)
        .post(userController.createUser)

router.route('/:id')
        .get(userController.getUser)
        .patch(userController.updateUser)
        .delete(userController.deleteUser)

router.route('/:id/videos').get(userController.getUserVideos)
router.route('/:id/videos').post(isLoggedIn, userController.createUserVideo)

router.route('/:id/videos/:pid').get(userController.getUserVideo)
router.route('/:id/videos/:pid').patch(isLoggedIn, userController.updateUserVideo)
router.route('/:id/videos/:pid').delete(isLoggedIn, userController.deleteUserVideo)


module.exports = router;