var mongoose = require('mongoose');
var crypto = require('crypto');
var autoIncrement = require('mongoose-auto-increment'); //自增ID 模块
autoIncrement.initialize(mongoose.connection); //初始化

var sha1Key = 'smartQiaoZhen';

var UserSchema = new mongoose.Schema({
    id : Number,
    username : {
        type: String,
        index: {unique:true},
        trim : true,
        lowercase : true
    },
    password : {type : String,
      set:(value) => {
        var hmac = crypto.createHmac('sha1',sha1Key);
        hmac.update(value);
        return hmac.digest('hex');
      }
    },//hamc@crypto
    userPhone : String,//validated
	nickname : String,
	cover : String,//filePath
	role: {
        type: Number,
        default: 0
    }
});


UserSchema.plugin(autoIncrement.plugin, {
    model: 'User',   //数据模块，需要跟同名 x.model("Books", BooksSchema);
    field: 'id',     //字段名
    startAt: 1,    //开始位置，自定义
    incrementBy: 1    //每次自增数量
});

UserSchema.statics = {
  getByUsername : function(name,cb) {
      return this.findOne({username:name.toLowerCase()})
      .select({id:1,username:1,nickname:1,_id:0})
      .exec(cb);
    },
  blurSearchByUsername : function(name,cb){
      return this.where('username',new RegExp(name, 'i'))
      .select({id:1,username:1,nickname:1,_id:0})
      .exec(cb);
  }
};

UserSchema.methods = {
  login : function(cb){
    return this.model('User')
    .findOne({username : this.username,password:this.password})
    .select({_id:0,__v:0,meta:0})
    .exec(cb);
  }
};

module.exports = UserSchema;
