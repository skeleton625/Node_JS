var express = require('express');
var router = express.Router();
var path = require('path');
// MySQL 객체 mysql 정의
var mysql = require('mysql')

// 연동할 MySQL의 데이터베이스 정보 정의
var connection = mysql.createConnection({
    host : 'localhost',         // 연동할 서버 IP 주소
    port : 3306,                // 연동할 서버 Port 번호
    user : 'root',              // 연동할 DB 주인 계정
    password : 'gktprkdhk24',   // 연동할 DB 주인 비밀번호
    database : 'jsman'          // 연동할 DB 명
});
// 정의된 connection 객체로 연결 시도
connection.connect();

router.use(express.static('public'))
// http://localhost:3000/form 주소로 접근할 때 사용하는 함수
router.get('/', function(req, res){
    res.sendFile(path.join(__dirname, "../public/form.html"));
});

// form.html의 POST 방식 submit버튼에 대한 처리
router.post('/form', function(req, res){
    // bodyParser 모듈을 통해 POST 방식 메시지로 전송된 email 데이터를 확인함.
    console.log("Requested Email : "+req.body.email)
    //res.send("<h1>Welcome! </h1>" + "<h2>"+ req.body.email + "</h2>")
    // POST 방식으로 전송받은 데이터를 email.ejs로 'email'이라는 변수명으로 전송함.
    res.render('email.ejs', {'email': req.body.email})
})

// form.html의 ajax send 버튼에 대한 처리
router.post('/ajax', function(req, res){
    // POST 형식으로 온 email 변수 정의
    var email = req.body.email;
    // DB에 전송할 json 변수 정의
    var response_data = {};
    var pattern_spc = /[=\"]/;

    if(pattern_spc.test(email))
    {
        console.log("SQL Injection occured");
        return;
    }
    // email 정보에 대한 DB 제어 코드 정의
    var query = connection.query('select name from user where email="'+email+'"', 
                // DB query에 대한 결과 입력
                function(err, rows){
                    // 에러일 경우, err를 날림
                    if(err) throw err;
                    // 변수 rows가 null이 아닐 경우,
                    if(rows[0]){
                        // 데이터가 존재함을 정의 및 해당 데이터를 입력
                        response_data.result = "ok";
                        response_data.name = rows[0].name;
                    } else{
                        // 데이터가 존재하지 않음을 정의
                        response_data.result = "none";
                        response_data.name = "";
                    }

                    // 새로 정의한 JSON 데이터를 javascript(main.js)로 전송
                    res.json(response_data)
                });

    // res.json이 비동기로 실행되기 위해 위치 변경
})

module.exports = router;