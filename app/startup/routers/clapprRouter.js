module.exports = function(app){
    //clappr播放页面的渲染
    app.get('/clappr', function(req, res) {
        res.render('./demo/clappr.jade');
    });
}
