var clappr = require('./routers/clapprRouter.js'),
    fileUpload = require('./routers/fileUploadRouter.js');

module.exports = function(app){
    clappr(app);
    fileUpload(app);
}
