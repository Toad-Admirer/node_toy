var multer = require('multer');
var storage = multer.diskStorage({
    //设置上传后文件路径，uploads文件夹会自动创建。
    destination: function(req, file, cb) {
        cb(null, './public/uploads');
    },
    //给上传文件重命名，获取添加后缀名
    filename: function(req, file, cb) {
        var fileFormat = (file.originalname).split(".");
        cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
	}
});

var upload = multer({
    storage: storage
});

//如需其他设置，请参考multer的limits,使用方法如下。
//var upload = multer({
//    storage: storage,
//    limits:{fieldSize:}//TODO 文件大小
// });


// muilter.single(‘file’), //适用于单文件上传
// muilter.array(‘file’,num), //适用于多文件上传，num为最多上传个数，上传文件的数量可以小于num,
// muilter.fields(fields), //适用于混合上传，比如A类文件1个，B类文件2个。官方API有详细说明
//upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 8 }])

module.exports = upload;
