const express = require('express'); 
var router = express.Router();

const categoryController = require('../controllers/category');
router.route('/').get(categoryController.getCategories)

module.exports = router;