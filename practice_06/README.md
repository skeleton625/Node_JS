# 5. MySQL DB 데이터 추가

CRUD란컴퓨터 소프트웨어 상에서 데이터를 C(Create), R(Read), U(Update), D(Delete)를 의미합니다.

이전에 GET 방식을 통해서 DB내에서 데이터를 READ( 이전의 select 명령어)를 진행했씁니다.

## 1. DB 데이터 추가 (CREATE) 01

이번 세션(강의)부터 GET, POST 방식을 사용해 DB의 user 테이블에 사용자읭 정보를 저장하는 과정을 진행하겠습니다.

먼저 사용자의 회원 가입 양식과 입력란을 보여줄 join.html을 public 폴더 내에 정의해 줍니다.

그 다음, 서버에서 join.html 과 DB에 정보 추가(Create)를 관리할 수 있는 router_add.js router를 정의해 줍니다.

필자는 router_add.js 파일을 router/join 폴더에 추가했씁니다.

## 2. DB 데이터 추가 (CREATE) 02

그 다음, join.html 파일에 email, name, password 용 input 태그를 구현해 데이터 추가를 위한 정보를 입력받도록

했씁니다.

마지막으로 router_add.js router에 POST 방식으로 회원 가입 요청이 들어올 시, 입력받은 데이터들을 통해 테이블에

데이터를 추가하도록 구현했씁니다. 명령어 및  실행 코드는 다음과 같습니다.

	''
	// javascript에서 '\'는 문자열 건너뛰기를 위한 특수 문자
	var query= connection.query('insert into user(email, name, pw) \
	
				     values("' + email + '","'+name+'","'+pw+'")',
	
	function(err, rows){
	
		if(err) throw err;

		console.log("Success : Insert command occured ! ! ");
	
	});

	''

위의 코드를 통해서 connection 객체에 정의된 DB에 데이터를 입력할 수 있씁니다.

현재 광의에서는 등록 결과를 html 또는 view engine으로 보여주지 않고 console로만 확인하도록

구현했습니다.

* 참고

MySQL에서 자동 숫자 증가 속성은 AUTO_INCREMENT 입니다.

즉, 테이블 생성 명령문에서 다음과 같음을 알 수 있습니다.

	CREATE TABLE user(
		
		UID IND AUTO_INCREMENT PRIMARY KEY,

		email VARCHAR(50) NOT NULL,

		...
	
	) ENGINE=InooDB DEFAULT CHARSET=utf8;

또는

	ALTER TABLE user MODIFY UID INT AUTO_INCREMENT PRIMARY KEY;

위와 같은 방법으로 자동 숫자 증가 속성이 포함된 Column을 생성할 수 있습니다.

## 03. DB 데이터 추가 (CREATE) 03

기존 SQL 문을 번거롭게 사용하지 않고 간단하게 축약해서 사용할 수도 있습니다.

	기존
		query('insert into user(email, name, pw) values("'+email+'","'+name+'","'+pw+'")', ...
	
	개선
	
	var sql = {email : email, name : name, pw : pw};

		query('insert into set ?, sql, ...

위 방법을 통해서 길고 복잡했던 SQL 문을 단축시킬 수 있습니다.

자세한 내용은 https://github.com/mysqljs/mysql#escaping-query-values 에 있습니다.

마지막으로 이전에 사용했던 ejs view engine을 사용해 회원 가입 후, 페이지를 표시해 보도록 하겠습니다.

	var query = connection.query('insert into user set ?', sql, function(err, rows){

			if(err) throw err;

			else res.render('register_succ.ejs', {'name' : name, 'id' : rows.insertId });

		});

위 코드를 통해 SQL 문 성공 시, register_succ.ejs 파일로 이동, 같이 입력된 json 데이터를 사용해 페이지를 표시할 수 

있습니다.

마찬가지로 나머지 U(Update), D(Delete) 기능도 사용할 수 있으며 AJAX, JSON을 통해 데이터를 보내는 작업 또한 수행할 

수가 있습니다.

그 외에도 로그인 절차에서 추가적으로 필요한 작업들이 존재합니다.

	- session 정보 저장

	- 인증값 저장 등

