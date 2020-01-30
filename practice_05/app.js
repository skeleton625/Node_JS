// body-parser 모듈을 요청해 bodyParser 객체로 정의
var bodyParser = require('body-parser')
// node_modules 폴더 내의 "express" 관련 함수를 불러와 정의함.
var express = require('express')
// 서버 함수 app을 실행.
// 함수 형태 변수 express를 실행해 실행 결과인 서버 함수를 app 변수로 정의
var app = express()
//router 폴더 내의 get.js를 main 객체로 정의
var main = require('./router/router_main')
var form = require('./router/router_form')

app.listen(3000, function(){
    // 서버가 싦행되면 Terminal에 확인을 위해 아래의 로그를 출력하도록 함.
    console.log("Start express server on port 3000!");
})

/* 
    app.js 파일이 존재하는 폴더 내의 public 폴더를 정적 폴더로 정의함.
    이를 통해서 public 폴더 내에 존재하는 main.js 자바스크립트 파일, images 폴더를 사용할 수 있음
*/
app.use(express.static('public'))
// bodyParser 모듈이 json, json 이외의 데이터에 대해 반응할 수 있도록 정의
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
// view engine으로 ejs 라이브러리를 사용
app.set('view engine', 'ejs')

// 브라우저 주소에서 /main으로 이동할 경우, main 객체 내의 작업을 수행하도록 함
app.use('/main', main)
app.use('/form', form)

// form.html의 POST 방식 submit버튼에 대한 처리
app.post('/email_post', function(req, res){
    // bodyParser 모듈을 통해 POST 방식 메시지로 전송된 email 데이터를 확인함.
    console.log("Requested Email : "+req.body.email)
    //res.send("<h1>Welcome! </h1>" + "<h2>"+ req.body.email + "</h2>")
    // POST 방식으로 전송받은 데이터를 email.ejs로 'email'이라는 변수명으로 전송함.
    res.render('email.ejs', {'email': req.body.email})
})

console.log("End of Server code . . .");