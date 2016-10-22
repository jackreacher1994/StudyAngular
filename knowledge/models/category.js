var mongoose = require('mongoose');

var categorySchema = mongoose.Schema({
    name: {
        type: String,
        index: true,
        required: true
    }
});

var Category = module.exports = mongoose.model('Category', categorySchema);

//Get all categories
module.exports.getCategories = function (callback) {
    Category.find(callback);
};

//Get category by ID
module.exports.getCategoryById = function (id, callback) {
    Category.findById(id, callback);
};

//Create new category
module.exports.createCategory = function (newCategory, callback) {
  newCategory.save(callback);
};