angular.module('knowledge')

.controller('CategoriesController', ['$scope', '$http', function ($scope, $http) {
    $http.get('/categories').success(function (data) {
        $scope.categories = data;
    });
}]);