var mongoose = require('mongoose');
var UserSchema = require('../schema/UserSchema.js');
var User = mongoose.model('User', UserSchema);

module.exports = User;
