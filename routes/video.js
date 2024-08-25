const express = require('express'); 
var router = express.Router();

const videoController = require('../controllers/video');

router.route('/')
        .get(videoController.getVideos)

router.route('/all')
        .get(videoController.getAllVideos)

router.route('/:id')
        .get(videoController.getVideo)

router.route('/recommendations').post(videoController.getRecommendations)

        
module.exports = router;