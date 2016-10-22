(function () {
  'use strict';

  describe('Cars Route Tests', function () {
    // Initialize global variables
    var $scope,
      CarsService;

    //We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _CarsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      CarsService = _CarsService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('cars');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/cars');
        });

        it('Should be abstract', function () {
          expect(mainstate.abstract).toBe(true);
        });

        it('Should have template', function () {
          expect(mainstate.template).toBe('<ui-view/>');
        });
      });

      describe('View Route', function () {
        var viewstate,
          CarsController,
          mockCar;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('cars.view');
          $templateCache.put('modules/cars/client/views/view-car.client.view.html', '');

          // create mock Car
          mockCar = new CarsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Car Name'
          });

          //Initialize Controller
          CarsController = $controller('CarsController as vm', {
            $scope: $scope,
            carResolve: mockCar
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:carId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.carResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            carId: 1
          })).toEqual('/cars/1');
        }));

        it('should attach an Car to the controller scope', function () {
          expect($scope.vm.car._id).toBe(mockCar._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/cars/client/views/view-car.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          CarsController,
          mockCar;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('cars.create');
          $templateCache.put('modules/cars/client/views/form-car.client.view.html', '');

          // create mock Car
          mockCar = new CarsService();

          //Initialize Controller
          CarsController = $controller('CarsController as vm', {
            $scope: $scope,
            carResolve: mockCar
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.carResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/cars/create');
        }));

        it('should attach an Car to the controller scope', function () {
          expect($scope.vm.car._id).toBe(mockCar._id);
          expect($scope.vm.car._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/cars/client/views/form-car.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          CarsController,
          mockCar;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('cars.edit');
          $templateCache.put('modules/cars/client/views/form-car.client.view.html', '');

          // create mock Car
          mockCar = new CarsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Car Name'
          });

          //Initialize Controller
          CarsController = $controller('CarsController as vm', {
            $scope: $scope,
            carResolve: mockCar
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:carId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.carResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            carId: 1
          })).toEqual('/cars/1/edit');
        }));

        it('should attach an Car to the controller scope', function () {
          expect($scope.vm.car._id).toBe(mockCar._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/cars/client/views/form-car.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
})();
