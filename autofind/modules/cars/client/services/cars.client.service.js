//Cars service used to communicate Cars REST endpoints
(function () {
  'use strict';

  angular
    .module('cars')
    .factory('CarsService', CarsService);

  CarsService.$inject = ['$resource'];

  function CarsService($resource) {
    return $resource('api/cars/:carId', {
      carId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
})();
