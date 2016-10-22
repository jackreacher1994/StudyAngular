var app = angular.module('knowledge', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/categories', {
            templateUrl: 'views/categories.html',
            controller: 'CategoriesController'
        })
        .when('/articles', {
            templateUrl: 'views/articles.html',
            controller: 'ArticlesController'
        })
        .when('/articles/detail/:id', {
            templateUrl: 'views/article_detail.html',
            controller: 'ArticlesDetailController'
        })
        .when('/articles/category/:category', {
            templateUrl: 'views/cate_articles.html',
            controller: 'ArticlesCategoryController'
        })
        .when('/articles/add', {
            templateUrl: 'views/add_article.html',
            controller: 'ArticlesCreateController'
        })
        .when('/articles/edit/:id', {
            templateUrl: 'views/edit_article.html',
            controller: 'ArticlesUpdateController'
        })
        .otherwise({redirectTo:'/articles'});
}]);