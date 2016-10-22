var express = require('express');
var router = express.Router();

var Article = require('../models/article');

/* GET articles listing. */
router.get('/', function(req, res, next) {
  Article.getArticles(function (err, articles) {
    if(err)
        console.log(err);

    res.json(articles);
  })
});

/* GET article by id */
router.get('/:id', function(req, res, next) {
  Article.getArticleById(req.params.id, function (err, article) {
    if(err)
      console.log(err);

    res.json(article);
  })
});

/* GET articles by category */
router.get('/category/:category', function(req, res, next) {
  Article.getArticlesByCategory(req.params.category, function (err, articles) {
    if(err)
      console.log(err);

    res.json(articles);
  })
});

/* Add article */
router.post('/', function (req, res, next) {
  var title = req.body.title;
  var body = req.body.body;
  var category = req.body.category;

  var newArticle = new Article({
    title: title,
    body: body,
    category: category
  });
  
  Article.createArticle(newArticle, function (err, article) {
    if(err)
        console.log(err);

    res.location('/articles');
    res.redirect('/articles');
  })
});

/* Update article */
router.put('/', function (req, res, next) {
  var id = req.body.id;

  var data = {
    title: req.body.title,
    body: req.body.body,
    category: req.body.category
  };

  Article.updateArticle(id, data, function (err, article) {
    if(err)
      console.log(err);

    res.location('/articles');
    res.redirect('/articles');
  })
});

/* Remove article */
router.delete('/:id', function (req, res, next) {
  var id = req.params.id;

  Article.removeArticle(id, function (err, article) {
    if(err)
      console.log(err);

    res.location('/articles');
    res.redirect('/articles');
  })
});

module.exports = router;
