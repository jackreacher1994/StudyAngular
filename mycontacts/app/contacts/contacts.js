'use strict';

angular.module('myContacts.contacts', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/contacts', {
    templateUrl: 'contacts/contacts.html',
    controller: 'ContactCtrl'
  });
}])

.controller('ContactCtrl', ['$scope', '$firebaseArray', '$window', function($scope, $firebaseArray, $window) {
  var ref = new Firebase('https://vivid-fire-3974.firebaseio.com/contacts');
  $scope.contacts = $firebaseArray(ref);

  $scope.showAddForm = false;
  $scope.showDetail = false;
  $scope.showEditForm = false;

  $scope.addForm = function () {
    $scope.showDetail = false;
    $scope.showEditForm = false;

    clearFields();

    $scope.showAddForm = !$scope.showAddForm;
    $scope.msg = '';
  };

  $scope.addContact = function () {
    $scope.contacts.$add({
      name: $scope.name,
      company: $scope.company,
      email: $scope.email
    }).then(function (ref) {
      var id = ref.key();
      console.log('Added contact with id '+id);

      clearFields();

      $scope.showAddForm = false;
      $scope.msg = 'Added contact!'
    });
  };

  $scope.showContact = function (contact) {
    $scope.name = contact.name;
    $scope.company = contact.company;
    $scope.email = contact.email;

    $scope.showDetail = true;
  };

  $scope.editForm = function (contact) {
    $scope.id = contact.$id;

    $scope.name = contact.name;
    $scope.company = contact.company;
    $scope.email = contact.email;

    $scope.showEditForm = true;
    $scope.msg = '';

    $scope.showAddForm = false;
  };

  $scope.editContact = function () {
    var id = $scope.id;

    var record = $scope.contacts.$getRecord(id);

    record.name = $scope.name;
    record.company = $scope.company;
    record.email = $scope.email;

    $scope.contacts.$save(record).then(function (ref) {
      clearFields();

      $scope.showEditForm = false;
      $scope.msg = 'Saved contact!'
    });
  }

  $scope.removeContact = function (contact) {
    if($window.confirm('Are you sure?')){
      $scope.contacts.$remove(contact);

      $scope.msg = 'Deleted contact!';
    }
  };

  function clearFields() {
    $scope.name = '';
    $scope.company = '';
    $scope.email = '';
  }
}]);