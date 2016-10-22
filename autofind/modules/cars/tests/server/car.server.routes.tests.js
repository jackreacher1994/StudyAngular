'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Car = mongoose.model('Car'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app, agent, credentials, user, car;

/**
 * Car routes tests
 */
describe('Car CRUD tests', function () {

  before(function (done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });

  beforeEach(function (done) {
    // Create user credentials
    credentials = {
      username: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create a new user
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: credentials.username,
      password: credentials.password,
      provider: 'local'
    });

    // Save a user to the test db and create new Car
    user.save(function () {
      car = {
        name: 'Car name'
      };

      done();
    });
  });

  it('should be able to save a Car if logged in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Car
        agent.post('/api/cars')
          .send(car)
          .expect(200)
          .end(function (carSaveErr, carSaveRes) {
            // Handle Car save error
            if (carSaveErr) {
              return done(carSaveErr);
            }

            // Get a list of Cars
            agent.get('/api/cars')
              .end(function (carsGetErr, carsGetRes) {
                // Handle Car save error
                if (carsGetErr) {
                  return done(carsGetErr);
                }

                // Get Cars list
                var cars = carsGetRes.body;

                // Set assertions
                (cars[0].user._id).should.equal(userId);
                (cars[0].name).should.match('Car name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Car if not logged in', function (done) {
    agent.post('/api/cars')
      .send(car)
      .expect(403)
      .end(function (carSaveErr, carSaveRes) {
        // Call the assertion callback
        done(carSaveErr);
      });
  });

  it('should not be able to save an Car if no name is provided', function (done) {
    // Invalidate name field
    car.name = '';

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Car
        agent.post('/api/cars')
          .send(car)
          .expect(400)
          .end(function (carSaveErr, carSaveRes) {
            // Set message assertion
            (carSaveRes.body.message).should.match('Please fill Car name');

            // Handle Car save error
            done(carSaveErr);
          });
      });
  });

  it('should be able to update an Car if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Car
        agent.post('/api/cars')
          .send(car)
          .expect(200)
          .end(function (carSaveErr, carSaveRes) {
            // Handle Car save error
            if (carSaveErr) {
              return done(carSaveErr);
            }

            // Update Car name
            car.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Car
            agent.put('/api/cars/' + carSaveRes.body._id)
              .send(car)
              .expect(200)
              .end(function (carUpdateErr, carUpdateRes) {
                // Handle Car update error
                if (carUpdateErr) {
                  return done(carUpdateErr);
                }

                // Set assertions
                (carUpdateRes.body._id).should.equal(carSaveRes.body._id);
                (carUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Cars if not signed in', function (done) {
    // Create new Car model instance
    var carObj = new Car(car);

    // Save the car
    carObj.save(function () {
      // Request Cars
      request(app).get('/api/cars')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Car if not signed in', function (done) {
    // Create new Car model instance
    var carObj = new Car(car);

    // Save the Car
    carObj.save(function () {
      request(app).get('/api/cars/' + carObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', car.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Car with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/cars/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Car is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Car which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Car
    request(app).get('/api/cars/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Car with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Car if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Car
        agent.post('/api/cars')
          .send(car)
          .expect(200)
          .end(function (carSaveErr, carSaveRes) {
            // Handle Car save error
            if (carSaveErr) {
              return done(carSaveErr);
            }

            // Delete an existing Car
            agent.delete('/api/cars/' + carSaveRes.body._id)
              .send(car)
              .expect(200)
              .end(function (carDeleteErr, carDeleteRes) {
                // Handle car error error
                if (carDeleteErr) {
                  return done(carDeleteErr);
                }

                // Set assertions
                (carDeleteRes.body._id).should.equal(carSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Car if not signed in', function (done) {
    // Set Car user
    car.user = user;

    // Create new Car model instance
    var carObj = new Car(car);

    // Save the Car
    carObj.save(function () {
      // Try deleting Car
      request(app).delete('/api/cars/' + carObj._id)
        .expect(403)
        .end(function (carDeleteErr, carDeleteRes) {
          // Set message assertion
          (carDeleteRes.body.message).should.match('User is not authorized');

          // Handle Car error error
          done(carDeleteErr);
        });

    });
  });

  it('should be able to get a single Car that has an orphaned user reference', function (done) {
    // Create orphan user creds
    var _creds = {
      username: 'orphan',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create orphan user
    var _orphan = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'orphan@test.com',
      username: _creds.username,
      password: _creds.password,
      provider: 'local'
    });

    _orphan.save(function (err, orphan) {
      // Handle save error
      if (err) {
        return done(err);
      }

      agent.post('/api/auth/signin')
        .send(_creds)
        .expect(200)
        .end(function (signinErr, signinRes) {
          // Handle signin error
          if (signinErr) {
            return done(signinErr);
          }

          // Get the userId
          var orphanId = orphan._id;

          // Save a new Car
          agent.post('/api/cars')
            .send(car)
            .expect(200)
            .end(function (carSaveErr, carSaveRes) {
              // Handle Car save error
              if (carSaveErr) {
                return done(carSaveErr);
              }

              // Set assertions on new Car
              (carSaveRes.body.name).should.equal(car.name);
              should.exist(carSaveRes.body.user);
              should.equal(carSaveRes.body.user._id, orphanId);

              // force the Car to have an orphaned user reference
              orphan.remove(function () {
                // now signin with valid user
                agent.post('/api/auth/signin')
                  .send(credentials)
                  .expect(200)
                  .end(function (err, res) {
                    // Handle signin error
                    if (err) {
                      return done(err);
                    }

                    // Get the Car
                    agent.get('/api/cars/' + carSaveRes.body._id)
                      .expect(200)
                      .end(function (carInfoErr, carInfoRes) {
                        // Handle Car error
                        if (carInfoErr) {
                          return done(carInfoErr);
                        }

                        // Set assertions
                        (carInfoRes.body._id).should.equal(carSaveRes.body._id);
                        (carInfoRes.body.name).should.equal(car.name);
                        should.equal(carInfoRes.body.user, undefined);

                        // Call the assertion callback
                        done();
                      });
                  });
              });
            });
        });
    });
  });

  afterEach(function (done) {
    User.remove().exec(function () {
      Car.remove().exec(done);
    });
  });
});
