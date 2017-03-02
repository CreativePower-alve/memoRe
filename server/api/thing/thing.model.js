'use strict';

var mongoose = require('mongoose');
var events = require('./thing.events');

var ThingSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

events.registerEvents(ThingSchema);
module.exports = mongoose.model('Thing', ThingSchema);
