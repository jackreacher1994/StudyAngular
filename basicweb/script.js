var app = angular.module("computer", ['ngRoute'])

.config(['$routeProvider', function($routeProvider){
  $routeProvider.
    when('/home',{
      templateUrl: 'home.html',
      controller:'HomeCtrl'
    }).
    when('/about',{
      templateUrl: 'about.html',
      controller:'HomeCtrl'
    }).
    when('/services',{
      templateUrl: 'services.html',
      controller:'ServicesCtrl'
    }).
    when('/contact',{
      templateUrl: 'contact.html',
      controller:'ContactCtrl'
    }).
    otherwise({redirectTo:'/home'});
}])

.controller('HomeCtrl', ['$scope', function($scope){
  
}])

.controller('ServicesCtrl', ['$scope', '$http', function($scope, $http){
  $http.get('services.json').then(function(response){
    $scope.services = response.data;
  });
}])

.controller('ContactCtrl', ['$scope', '$http', function($scope, $http){
   $http.get('locations.json').then(function(response){
    $scope.locations = response.data;
  });
}]);