var upload = require('../startup-multer.js'),
    Movie = require('../../dao/mongodb/model/Movie.js'),
    ffmpeg = require('fluent-ffmpeg'),
    setting = require('../../settings/settings.js');

module.exports = function(app) {
    //播放器渲染
    app.get('/file', function(req, res) {
        res.render('./demo/fileUpload.jade');
    });

    //Multer文件上传
    app.post('/fileUpload', upload.fields([{
        name: 'cover',
        maxCount: 1
    }, {
        name: 'source',
        maxCount: 1
    }]), function(req, res, next) {
        // console.log(req.files);
        // console.log(req.body);
        res.end("OK");
        if (req.files.source[0]) {
            var source = req.files.source[0];
            var filePath = source.destination + "/" + source.filename;
            var command = ffmpeg(filePath);
            command.ffprobe(function(err, metadata) {
                if (err) console.log(err);
                else {
                    var screenshotsPosition = [];
                    var screenshots = [];
                    var duration = metadata.format.duration;
                    var bo = setting.ffmpeg.screenshotsDuration;
                    //根据影片时长,截取间隔为offset的图片
                    for (var i = 0; i < duration; i += offset) {
                        screenshotsPosition.push(i);
                        // screenshots.push({
                        //     time: i,
                        //     filename: `${source.filename}-at-${i}-seconds.png`
                        // });
                    }
                    command.screenshots({
                        timestamps: screenshotsPosition,
                        filename: '%f-at-%s-seconds.png',
                        folder: source.destination,
                        size: '320x240'
                    });
                    var newMovie = new Movie({
                        name: req.body.name,
                        filename: source.filename,
                        duration: duration
                    });
                    newMovie.save(function(err) {
                        if (err) console.log(err);
                        else console.log('movie-saved');
                    });
                }
            });
        }
    });
}
