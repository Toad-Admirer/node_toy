var Movie = require('../../dao/mongodb/model/Movie.js');
var setting = require('../../settings/settings.js');
module.exports = function(app) {
    //clappr播放页面的渲染
    app.get('/clappr/:movieName', function(req, res) {
        var movieName = req.params.movieName;
        Movie.getByName(movieName, function(err, movie) {
            if (err) console.log(err);
            else {
                var delta = setting.ffmpeg.screenshotsDuration;
                var duration = movie.duration;
                res.render('./demo/clappr.jade', {
                    movie: movie,
                    delta: delta,
                    duration: duration
                });
            }
        });
    });
};
