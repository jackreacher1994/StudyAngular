'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Job Schema
 */
var JobSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill name',
    trim: true
  },
  description: {
    type: String,
    default: '',
    required: 'Please fill description',
    trim: true
  },
  company: {
    type: String,
    default: '',
    required: 'Please fill company',
    trim: true
  },
  state: {
    type: String,
    default: '',
    required: 'Please fill state',
    trim: true
  },
  contact_email: {
    type: String,
    default: '',
    required: 'Please fill contact email',
    trim: true
  },
  requirements: {
    type: String,
    default: '',
    required: 'Please fill requirements',
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Job', JobSchema);
