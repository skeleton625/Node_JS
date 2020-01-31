var express = require('express');
var mysql = require('mysql');
var path = require('path');
var router = express.Router();

// MySQL DB와 Router 연결
var connection = mysql.createConnection({
    host : 'localhost',
    port : 3306,
    user : 'root',
    password : 'gktprkdhk24',
    database : 'jsman'
});
connection.connect();

// http://localhost:3000/join 주소를 통해 접근할 경우에 대한 관리  함수
router.get('/', function(req, res){
    // public/join.html을 전송
    res.sendFile(path.join(__dirname, '../../public/join.html'));
});

router.post('/', function(req, res){
    var body = req.body;
    var email = body.email;
    var name = body.name;
    var pw = body.password;
    // 패턴 감지 변수
    var pattern_spec = /[=\"]/;

    // 입력된 문자열 내에 입력되지 말아야할 특수 문자가 있는지 확인
    if(pattern_spec.test(email) && pattern_spec.test(name) && pattern_spec.test(pw))
    {
        console.log("SQL Injection occured ! !");
        return;
    }

    // 없을 시, SQL 문 실행
    var sql = {email : email, name : name, pw : pw};
    var query = connection.query('insert into user set ?', sql, 
    function(err, rows){
        if(err) throw err;
        // SQL 문 성공 시, register_succ view 파일로 이동
        else res.render('register_succ.ejs', {'name' : name, 'id' : rows.insertId});
    });
});

module.exports = router;