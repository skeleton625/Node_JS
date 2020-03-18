var express = require('express');
// express 모듈의 router 객체 정의
var router = express.Router();
// path 모듈의 path 객체 정의
var path = require('path');

// 여기선 /main이 root 경로 -> '/main' == '/'
router.get('/', function(req, res){
    // __dirname과 ../public/main.html을 상대적으로 합쳐줌
    // 현재 주소    .../practice_05/router/main.js
    // 원하는 주소  .../practice_05/public/main.html
    //res.sendFile(path.join(__dirname, '../public/main.html'));
    res.render('main.ejs', {'name' : req.user.name});
});

// 임시방편
router.get('/images/crong.jpg', function(req, res){
    res.sendFile(path.join(__dirname, '../public/images/crong.jpg'));
});

// 현재 main.js 파일을 module을 통해 다른 코드에서 사용할 수 있도록 함.
module.exports = router;