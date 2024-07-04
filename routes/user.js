const express = require('express'); 
var router = express.Router();

const userController = require('../controllers/user');

router.route('/')
        .get(userController.getUsers)
        .post(userController.createUser)

router.route('/:id')
        .get(userController.getUser)
        .patch(userController.updateUser)
        .delete(userController.deleteUser)

router.route('/:id/videos')
        .get(userController.getUserVideos)
        .post(userController.createUserVideo)

router.route('/:id/videos/:pid')
        .get(userController.getUserVideo)
        .patch(userController.updateUserVideo)
        .delete(userController.deleteUserVideo)


module.exports = router;