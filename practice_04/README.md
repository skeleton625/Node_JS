# 4. Node.js 와 Database(MYSQL) 연동

## 1. MYSQL 연동 설정

해당 강의의 실습을 하기 위해선 MySQL을 설치해야 합니다.

필자의 경우, MySQL 홈페이지에서 MySQL Server 8.0을 다운로드 받았씁니다.

MySQL을 다운로드 받은 뒤,  "고급 시스템 설정"에서 환경 변수 "Path" 에 MySQL Server 8.0\bin 경로를

추가해주면 명령 프롬프트 내에서 MySQL을 실행할 수 있게 됩니다. 명령어는 다음과 같습니다.

	> mysql -u [계정] -p [데이터베이스]
	
	// 기본적인 접근 명령어 
	
	> mysql -u root -p

또한 강의를 진행하기 위해서 새 데이터 베이스와 User 테이블을 생성해야 합니다.

	> CREATE DATABASE jaman;

	> USE jaman;

	> CREATE TALBE user(

		email VARCHAR(50) NOT NULL,

		name VARCHAR(25) NOT NULL,

		pw VARCHAR(25) NOT NULL

		) ENGINE=InnoDB DEFAULT CHARSET=utf8;

위와 같은 명령어를 통해 "jaman" 데이터베이스를 생성하고 데이터베이스 내에 "user"

테이블을 생성하게 되었습니다.

다음은 "user" 테이블 내에 레코드를 추가해 보도록 하겠습니다.

	> INSERT INTO user (email, name, pw) values ('crong@naver.com', 'crong', 'asdf');

위와 같은 명령어를 통해 이메일 "crong@naver.com", 이름"crong", 비밀번호"asdf"를 갖는 레코드로

추가했습니다.

## MySQL과 Node.js 연동

이제 MySQL과 Node.js를 연동해 보도록 하겠습니다.

먼저 MySQL과 Node.js를 연동하기 위해 NPM에서 mysql 모듈을 설치해 줍니다.

	> npm install mysql --save

설치가 완료되면 Node.js 코드에 mysql을 정의해 줍니다.

	''

	var mysql = require('mysql')

	''

여기서 정의된 mysql 객체를 통해 연결하고자 하는 데이터베이스에 대한 정보를 정의해 줍니다.

	''

	var connection = mysql.createConnection({
		
		host : 'localhost'

		port : 3306

		user : root

		password : '*********'

		database : 'jaman'

	});

	''

마지막으로 정보까지 DB 정보까지 정의된 connection 객체를 서버와 연결해 줍니다.

	''

	connection.connect();

	''

위와 같은 코드를 입력한 뒤, 서버를 실행하면 정상적으로 서버가 작동함을 확인할 수 있습니다.
