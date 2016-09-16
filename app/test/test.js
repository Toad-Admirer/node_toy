var fs = require('fs');
var isExist = fs.realpathSync('./public/uploads/movie/');
console.log(isExist);
