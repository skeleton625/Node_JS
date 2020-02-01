var bodyParser = require('body-parser');
var express = require('express');
var app = express();
// 모든 router들을 관리할 router 객체 정의
var router = require('./router/router_index');
// passport 정의
var passport = require('passport');
var LocalStrategy = require('passport-local');
// session 정의
var session = require('express-session');
// connect-flash 정의
var flash = require('connect-flash');

// 서버 listen 시작
app.listen(3000, function(){
    console.log("Start express server on port 3000!");
});



// 미들웨어 정의
app.use(express.static('public'))
// bodyParser 모듈이 json, json 이외의 데이터에 대해 반응할 수 있도록 정의
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
// view engine으로 ejs 라이브러리를 사용
app.set('view engine', 'ejs');
// passport 인증에서 사용할 session 정의
app.use(session({
    secret : 'keyboard cat',
    resave : false,
    saveUninitialized : true
}))
// passport 인증에 필요한 모듈들 초기화
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// 초기 경로를 router 객체의 경로로 지정
app.use(router);