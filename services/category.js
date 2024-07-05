const Category = require("../models/category");
const { MoongoClient, MongoClient } = require("mongodb");

const getCategories = async () => {
  const categories = await Category.find({});
  return categories;
};

module.exports = { getCategories };
