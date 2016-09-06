var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/blog',(err) => {
  if(err) console.log(err);
  else console.log('connection success');
});
var User = require('../dao/mongodb/model/User.js');

// var user = new User({username : 'shenjiantu',password : 'shenjianping',nickname:'阿建'});
// console.log(user);
// user.save((err)=>{
//   if (err) console.log(err);
//   else console.log('saved');
// });


// User.getByUsername('shenjianping',(err,user)=>{
//   if(err) console.log(err);
//   console.log(user);
// })

// User.blurSearchByUsername('shen',(err,user) => {
//   if(err) console.log(err);
//   console.log(user);
// })

var user = new User({ username: 'shenjianping', password: 'shenjianping' });
user.login(function(err,user){
    if(err) console.log(err);
    else console.log(user);
});
