var mongoose = require('mongoose');
var settings = require('../settings/settings.js');

var db = mongoose.connect(settings.mongodb.url,function(err){
  if(err) console.log(err);
  else console.log('connection success');
});


// var Movie = require('../dao/mongodb/model/Movie.js');

// var movie = new Movie({name : 'shenjianping',actress : 'shenjianping'});
// console.log(movie);
// movie.save((err)=>{
//   if (err) console.log(err);
//   else console.log('saved');
// });

// Movie.getById(1,(err,movie)=>{
//   if(err) console.log(err);
//   console.log(movie);
// });

// Movie.getAll(0,3,(err,movie) => {
//   if(err) console.log(err);
//   console.log(movie);
// })

// Movie.getCount((err,count) => {
//   if(err) console.log(err);
//   console.log(count);
// })

// Movie.deleteById(2,(err,movie) => {
//   if(err) console.log(err);
//   else console.log(movie);
// })
