var setting = require('../settings/settings.js'),
    mongoose = require('mongoose');

//日志暂定
mongoose.connect(setting.mongodb.url);

module.exports = {};
