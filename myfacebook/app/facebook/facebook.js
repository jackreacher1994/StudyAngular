'use strict';

angular.module('myFacebook.facebook', ['ngRoute', 'ngFacebook'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/facebook', {
    templateUrl: 'facebook/facebook.html',
    controller: 'FacebookCtrl'
  });
}])

.config( function( $facebookProvider ) {
  $facebookProvider.setAppId('1522302271403527');
  $facebookProvider.setPermissions('email, public_profile, user_posts, publish_actions, user_photos');
})

.run( function( $rootScope ) {
  (function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
})

.controller('FacebookCtrl', ['$scope', '$facebook', function($scope, $facebook) {
  $scope.isLoggedIn = false;

  $scope.login = function () {
    $facebook.login().then(function () {
      refresh();
    });
  };

  $scope.logout = function () {
    $facebook.logout().then(function () {
      refresh();
    })
  }

  function refresh() {
    $facebook.api('/me').then(function (response) {
      $scope.isLoggedIn = true;
      $scope.welcomeMsg = 'Welcome, ' + response.name;
      $scope.userInfo = response;

      $facebook.api('me/picture').then(function (response) {
        $scope.avatar = response.data.url;

        $facebook.api('me/permissions').then(function (response) {
          $scope.permissions = response.data;

          $facebook.api('me/posts').then(function (response) {
            $scope.posts = response.data;
          })
        })
      })
    }, function (err) {
      $scope.isLoggedIn = false;
      $scope.welcomeMsg = 'Please login';
    });
  }

  $scope.postStatus = function () {
    var status = this.status;
    $facebook.api('me/feed', 'post', {message: status}).then(function () {
      console.log('Posted!');
      refresh();
      $scope.status = '';
    });
  }

  refresh();
}]);