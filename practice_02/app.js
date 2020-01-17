// node_modules 폴더 내의 "express" 관련 함수를 불러와 정의함.
var express = require('express')
// 함수 형태 변수 express를 실행해 실행 결과인 서버 함수를 app 변수로 정의
var app = express()
// body-parser 모듈을 요청해 bodyParser 객체로 정의
var bodyParser = require('body-parser')
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

/* 
    app.js 파일이 존재하는 폴더 내의 public 폴더를 정적 폴더로 정의함.
    이를 통해서 public 폴더 내에 존재하는 main.js 자바스크립트 파일, images 폴더를 사용할 수 있음
*/
app.use(express.static('public'))
// bodyParser 모듈이 json, json 이외의 데이터에 대해 반응할 수 있도록 정의
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine', 'ejs')

/*
    서버 함수 app을 통해 클라이언트가 GET 방식으로 서버 파일들에 접근할 수 있도록 함
*/
app.get('/', function(req, res){
    // html 코드 자체를 전송할 수 있음
    // res.send("<h1>Hello friend!</h1>")
    // 또는 이미 구현된 파일들을 전송할 수도 있음
    res.sendFile(__dirname + "/public/main.html")
})

// get 초기 매개변수를 통해 클라이언트가 접근하는 경로를 정의해줄 수 있음
app.get('/main', function(req, res){
    res.sendFile(__dirname + "/public/main.html")
})

// form.html의 POST 방식 submit버튼에 대한 처리
app.post('/email_post', function(req, res){
    // bodyParser 모듈을 통해 POST 방식 메시지로 전송된 email 데이터를 확인함.
    console.log("Requested Email : "+req.body.email)
    //res.send("<h1>Welcome! </h1>" + "<h2>"+ req.body.email + "</h2>")
    // POST 방식으로 전송받은 데이터를 email.ejs로 'email'이라는 변수명으로 전송함.
    res.render('email.ejs', {'email': req.body.email})
})

// form.html의 ajax send 버튼에 대한 처리
app.post('/ajax_send_email', function(req, res){
    // 전송 받은 데이터를 JSON 데이터로 새로 정의
        // 해당 코드는 이후에 DB를 통해 DB 내에 데이터가 존재하는지 확인하는 과정으로 수정할 예정임
    var response_data = {'result' : 'ok', 'email' : req.body.email}
    // 새로 정의한 JSON 데이터를 javascript(main.js)로 전송
    res.json(response_data)
})

console.log("End of Server code . . .")