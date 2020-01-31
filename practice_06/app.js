// body-parser 모듈을 요청해 bodyParser 객체로 정의
var bodyParser = require('body-parser');
// node_modules 폴더 내의 "express" 관련 함수를 불러와 정의함.
var express = require('express');
// 서버 함수 app을 실행.
// 함수 형태 변수 express를 실행해 실행 결과인 서버 함수를 app 변수로 정의
var app = express();
// 모든 router들을 관리할 router 객체 정의
var router = require('./router/router_index');

app.listen(3000, function(){
    // 서버가 싦행되면 Terminal에 확인을 위해 아래의 로그를 출력하도록 함.
    console.log("Start express server on port 3000!");
});

// 미들웨어 정의
/* 
    app.js 파일이 존재하는 폴더 내의 public 폴더를 정적 폴더로 정의함.
    이를 통해서 public 폴더 내에 존재하는 main.js 자바스크립트 파일, images 폴더를 사용할 수 있음
*/
app.use(express.static('public'))
// bodyParser 모듈이 json, json 이외의 데이터에 대해 반응할 수 있도록 정의
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
// view engine으로 ejs 라이브러리를 사용
app.set('view engine', 'ejs');

// 초기 경로를 router 객체의 경로로 지정
app.use(router);

console.log("End of Server code . . .");