var mongoose = require('mongoose');
var MovieSchema = require('../schema/MovieSchema.js');
var Movie = mongoose.model('Movie', MovieSchema);

module.exports = Movie;
