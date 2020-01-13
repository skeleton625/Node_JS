// node_modules 폴더 내의 "express" 관련 함수를 불러와 정의함.
var express = require('express')
// 함수 형태 변수 express를 실행해 실행 결과인 서버 함수를 app 변수로 정의
var app = express()
// 서버 함수 app을 실행.
/* 
    서버 함수 app을 실행.
    해당 서버는 Port 3000번으로 정의.
    즉 서버의 주소는 "http://localhost:3000/" 이 됨.
 */
app.listen(3000, function(){
    // 서버가 싦행되면 Terminal에 확인을 위해 아래의 로그를 출력하도록 함.
    console.log("Start express server on port 3000!");
})

console.log('End of Server code . . .')