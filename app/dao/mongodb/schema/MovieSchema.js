var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment'); //自增ID 模块
autoIncrement.initialize(mongoose.connection); //初始化
var MovieSchema = new mongoose.Schema({
    id : Number,
    name : String,
    actress : [String],
	publisher : String,
    tags : [],
	cover : String,//cover file path
	screenshot : [String],//ffmpeg screenshot
	path : String,//resource file path
    meta: {
        created: {
            type: Date,
            default: Date.now()
        },
        updated: {
            type: Date,
            default: Date.now()
        }
    }
});

MovieSchema.plugin(autoIncrement.plugin, {
    model: 'Movie',   //数据模块，需要跟同名 x.model("Books", BooksSchema);
    field: 'id',     //字段名
    startAt: 1,    //开始位置，自定义
    incrementBy: 1    //每次自增数量
});

MovieSchema.statics ={
  getById : function(id,cb){
    return this.findOne({id:id}).select({_id:0,meta:0,__v:0})
    .exec(cb);
  },
  getAll : function(pageNo,pageSize,cb){
    return this.find().select({_id:0,__v:0})
    .skip(pageNo*pageSize).limit(pageSize).sort({'meta.created':-1})
    .exec(cb);
  },
  deleteById : function(id,cb){
    return this.remove({id:id})
    .exec(cb);
  },
  getCount : function(cb){
    return this.find().count().exec(cb);
  }
};

MovieSchema.pre('save', function(next)  {
  if (this.isNew) {
      this.meta.createAt = this.meta.updateAt = Date.now();
    }else {
      this.meta.updateAt = Date.now();
    }
    next();
});

module.exports = MovieSchema;
