var ffmpeg = require('fluent-ffmpeg');
var command = ffmpeg('./public/uploads/1.mp4');
command.screenshots({
    timestamps: [30.5, '50%', '01:10.123'],
    filename: 'thumbnail-at-%s-seconds.png',
    folder: 'E:/output',
    size: '320x240'
  });
