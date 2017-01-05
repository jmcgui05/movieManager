'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var movieSchema = new Schema({
  "title": String,
  "genre": String,
  "year": String,
  "rating": String,
  "actors": []
})

module.exports = mongoose.model('Movie', movieSchema);