'use strict';

angular.module('templateStore.templates', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/templates', {
    templateUrl: 'templates/templates.html',
    controller: 'TemplatesCtrl'
  })
  .when('/templates/:id', {
    templateUrl: 'templates/detail.html',
    controller: 'TemplateDetailCtrl'
  });
}])

.controller('TemplatesCtrl', ['$scope', '$http', function($scope, $http) {
  $http.get('data/templates.json').then(function(response){
    $scope.templates = response.data;
  });
}])

.controller('TemplateDetailCtrl', ['$scope', '$http', '$routeParams', '$filter', function($scope, $http, $routeParams, $filter) {
  var templateId = $routeParams.id;
  $http.get('data/templates.json').success(function(data){
    $scope.template = $filter('filter')(data, function(d){
      return d.id == templateId;
    })[0];
  });

  $scope.setPrimeImage = function (image) {
    $scope.template.primeImage = image;
  };
}]);