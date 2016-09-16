var setting = require('../settings/settings.js'),
    mongoose = require('mongoose');

//日志暂定
mongoose.connect(setting.mongodb.url,function(err){
  if(err) console.log(err);
  else console.log('mongodb-connection-initialized');
});
mongoose.Promise = require('bluebird');
module.exports = {};
