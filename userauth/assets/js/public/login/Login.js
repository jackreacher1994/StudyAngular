var app = angular.module('LoginModule', ['toastr'])

.controller('LoginController', ['$scope', '$http', 'toastr', function ($scope, $http, toastr) {
  $scope.login = function () {
    //Submit to Sails server
    $http.post('/login', {
      email: $scope.email,
      password: $scope.password
    })
      .then(function onSuccess(response) {
        window.location = '/dashboard';
      })
      .catch(function onError(err) {
        if(err.status == 404 || 400){
          toastr.error('Invalid credentials!', 'Error', {
            closeButton: true
          });
          return;
        }

        toastr.error('An error has occured, please try again later!', 'Error', {
            closeButton: true
          });
        return;
      });
  };
}]);
