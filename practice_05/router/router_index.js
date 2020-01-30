var express = require('express');
var router = express.Router();
var path = require('path');

//router 폴더 내의 router_main.js, router_form.js를 각각 main, form 객체로 정의
var main = require('./router_main')
var form = require('./router_form')

// 초기 경로에 따른 html 파일 전송
router.get('/', function(req, res){
    res.sendFile(path.join(__dirname, '../public/main.html'));
});

// URL Routing을 위한 정의
router.use('/main', main)
router.use('/email', form)

module.exports = router;
