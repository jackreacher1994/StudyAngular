var app = angular.module('DashboardModule', [])

  .controller('DashboardController', ['$scope', '$http', function ($scope, $http) {
    $scope.getUser = function () {
      $http.get('/getuser')
        .then(function onSuccesss(user) {
          console.log(user);
          $scope.user = user.data;
        })
        .catch(function onError(err) {
          console.log(err);
        });
    };
  }]);
