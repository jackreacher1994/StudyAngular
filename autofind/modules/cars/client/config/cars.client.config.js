(function () {
  'use strict';

  angular
    .module('cars')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', {
      title: 'Cars',
      state: 'cars',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'cars', {
      title: 'List Cars',
      state: 'cars.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'cars', {
      title: 'Create Car',
      state: 'cars.create',
      roles: ['user']
    });
  }
})();
