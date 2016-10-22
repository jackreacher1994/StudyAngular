var app = angular.module('SignupModule', [])

.controller('SignupController', ['$scope', '$http', function ($scope, $http) {
  $scope.signup = function () {
    //Submit to Sails server
    $http.post('/signup', {
      name: $scope.name,
      email: $scope.email,
      password: $scope.password
    })
      .then(function onSuccess(response) {
        window.location = '/user';
      })
      .catch(function onError(err) {
        console.log('Error: '+err);
      });
  };
}]);
