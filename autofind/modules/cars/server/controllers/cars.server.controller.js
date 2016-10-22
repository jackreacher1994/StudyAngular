'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Car = mongoose.model('Car'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Car
 */
exports.create = function(req, res) {
  var car = new Car(req.body);
  car.user = req.user;

  car.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(car);
    }
  });
};

/**
 * Show the current Car
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var car = req.car ? req.car.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  car.isCurrentUserOwner = req.user && car.user && car.user._id.toString() === req.user._id.toString() ? true : false;

  res.jsonp(car);
};

/**
 * Update a Car
 */
exports.update = function(req, res) {
  var car = req.car ;

  car = _.extend(car , req.body);

  car.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(car);
    }
  });
};

/**
 * Delete an Car
 */
exports.delete = function(req, res) {
  var car = req.car ;

  car.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(car);
    }
  });
};

/**
 * List of Cars
 */
exports.list = function(req, res) { 
  Car.find().sort('-created').populate('user', 'displayName').exec(function(err, cars) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(cars);
    }
  });
};

/**
 * Car middleware
 */
exports.carByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Car is invalid'
    });
  }

  Car.findById(id).populate('user', 'displayName').exec(function (err, car) {
    if (err) {
      return next(err);
    } else if (!car) {
      return res.status(404).send({
        message: 'No Car with that identifier has been found'
      });
    }
    req.car = car;
    next();
  });
};
