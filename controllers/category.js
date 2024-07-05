const categoryService = require('../services/category');

const getCategories = async(req, res) => {
    res.json(await categoryService.getCategories());
};

module.exports = { getCategories };