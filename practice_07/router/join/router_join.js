var express = require('express');
var mysql = require('mysql');
var path = require('path');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local');

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
    var msg;
    // 'local-join' 정책에서 false가 올 경우, 같이 온 데이터 입력
    var errMsg = req.flash('error');
    if(errMsg) msg = errMsg;

    // view engine을 사용해 화면에 표시하도록 수정
    res.render('join.ejs', {'message' : msg});
});

// passport Serialize 부분
passport.serializeUser(function(user, done){
    // DB query로 전송된 user json의 id를 출력
    console.log('passport session save : ', user.id);
    // DB query의 user json을 그대로 deserializeUser 메소드로 전송
    done(null, user);
});

passport.deserializeUser(function(user, done){
    // serializeUser 메소드에서 전송된 user json의 id 값을 출력
    console.log('passport session get id : ', user.id);
    // 그대로 user json을 router_main.js로 전송
    done(null, user);
});

// passport 정책 정의
passport.use('local-join', new LocalStrategy({
        usernameField : 'email', 
        passwordField : 'password',
        passReqToCallback : true
    }, function(req, email, password, done){
        // 현재 입력된 이메일이 존재하는지 확`인
        var query = connection.query('select * from user where email=?', [email],
        function(err, rows){
            if(err) return done(err);

            // 입력된 이메일이 존재할 경우
            if(rows.length){
                console.log('This '+email+' is already existed');
                // pasport.authenticate 함수에 실패함(false)과 메세지(message)를 전송
                return done(null, false, {message : 'your emails is already existed'});
                // 메세지 기능의 경우 connect-flash 모듈을 통해서 사용 가능
            }
            // 입력된 이메일이 존재하지 않을 경우 
            else{
                // username, password 를 제외한 값들의 경우, req 매개변수를 통해 가져올 수 있음
                var sql = {email : email, name : req.body.name, pw : password};
                // 이메일을 DB에 등록
                var query = connection.query('insert into user set ?', sql, function(err, rows){
                    if(err) throw err;
                    // 완료되었음을 전송
                    return done(null, {'email ': email, 'name' : req.body.name, 'id' : rows.insertId});
                });
            }
        })
    }
));

// local-join 정책에서 성공과 실패에 따라 재 이동 시켜주는 기능
router.post('/', passport.authenticate('local-join', {
    successRedirect : '/main',  // 성공할 경우, /main 으로 이동
    failureRedirect : '/join',  // 실패할 경우, /join 으로 이동 (현재 페이지)
    failureFlash : true
}));

/*
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
*/

module.exports = router;