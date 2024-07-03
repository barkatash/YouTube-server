const express = require('express'); 
var router = express.Router();

const videoController = require('../controllers/video');
router.route('/').get(videoController.getVideos)
module.exports = router;