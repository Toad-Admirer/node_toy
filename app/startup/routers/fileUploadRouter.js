var upload = require('../startup-multer.js'),
ffmpeg = require('fluent-ffmpeg'),
setting = require('../../settings/settings.js');

module.exports = function(app){
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
        if (req.body.screenshots == 'true' && req.files.source[0]) {
            var source = req.files.source[0];
            var filePath = source.destination + "/" + source.filename;
            var command = ffmpeg(filePath);
            command.ffprobe(function(err, metadata) {
                if (err) console.log(err);
                else {
                    var screenshotsPosition = [];
                    var screenshots = [];
                    var duration = metadata.format.duration;
                    var offset = setting.ffmpeg.screenshotsDuration;
                    //根据影片时长,截取间隔为offset的图片
                    for (var i = 0;(duration -= offset) > 0; i += offset) {
                        screenshotsPosition.push(i);
                        screenshots.push({
                            time: i,
                            filename: `${source.filename}-at-${i}-seconds.png`
                        });
                    }
                    command.screenshots({
                        timestamps: screenshotsPosition,
                        filename: '%f-at-%s-seconds.png',
                        folder: source.destination,
                        size: '320x240'
                    });
                }
            });
        }
    });
}
