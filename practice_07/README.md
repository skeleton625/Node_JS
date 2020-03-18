# 6. 패스포트 기반 인증 로직 구현(회원가입, 로그인, 로그아웃)

세션을 통해 클라리언트가 로그인, 로그 아웃에 대한 정보를 관리하도록 구현해 볼 것입니다.

## 1. passport 환경 구축

현재 강의를 진행하기 위해서 login.ejs view engine 파일을 새로 구현했습니다. (views/login.ejs)

먼저 passport 인증 방식을 지원하기 위해서 npm 라이브러리의 passport 모듈을 설치하겠습니다.

명령어는 다음과 같습니다.

	> npm install passport passport-local express-session connect-flash --save-dev

'passport-lcoal'는 passport 처리를 local(현재 컴퓨터)로 처리하는 모듈을,

'express-session'는 session 처리를 express를 사용해 처리하는 모듈을,

'connect-flash'는 메세지를 redirect 하는 과정에서 쉽게 전달해주는 모듈을 의미합니다.

passport 모듈에 대한 자세한 내용은 다음 페이지에 나와 있습니다.

	> http://www.passportjs.org/docs/

	> https://github.com/jaredhanson/passport-local (passport-local)

express-session 모듈에 대한 자세한 내용은 다음 페이지에 나와 있습니다.

	> https://github.com/expressjs/session

connect-flash 모듈에 대한 자세한 내용은 다음 페이지에 나와 있습니다.

	> https://github.com/jaredhanson/connect-flash

먼저 이전 강의의 실습을 진행하기 이전에 현재 설지한 모듈들을 사용하기 위해서 

미리 정의해 둡니다.

	''

	var passport = require('passport');
	
	var LocalStratagey = require('passport-local')

	var session = require('express-session');

	var flash = require('connect-flash');

	''

## 2. middleware, strategy 설정

이전에 설치한 모듈들을 사용하기위해 미들웨어를 먼저 수정해 줍니다.

	app.use(session({
	
		// 쿠키를 임의로 변조하는 것을 방지하기 위한 값, 임의의 문자열로 정의

		secret : 'keyboard cat',
		
		// 세션을 변경되지 않아도 언제나 저장할지 결정

		resave : false,

		//세션에 저장되기 전에 uninitialized 상태로 미리 만들어 저장할 지를 결정
		
		saveUninitialized : true
	}));

위는 사용할 session을 정의하는 코드입니다.

여기서 session에 대한 상세한 정보 및 설정을 정의할 수가 있습니다.

그 다음, passport 인증을 사용하기 위해서 위에서 정의한 모듈들을 사용한다고 정의해줘야 합니다.

	// passport 초기화

	app.use(passport.initialize());
	
	// session, flash 사용 정의OB

	app.use(passport.session());

	app.use(flash());

그리고 routing 처리를 위해 router를 관리하는 router_index.js에서 passport에 대한 정의를 해줍니다.

	// local-join 이라는 새 local strategy를 정의

	passport.use('local-join', new LocalStrategy({
	
		// Id, Password로 어떤 태그를 쓸 건지 정의 - Default 값

		usernameField : 'email',

		passwordField : 'password',

		// Callback을 통해서 전송하겠음을 정의
	
		passReqToCallback : true

	}, function(req, email, password, done){
	
		// 확인을 위한 로트 출력

		console.log('local-join callback called');
	
	}));

위 코드는 passport에서 사용하게 될 새로운 정책(Strategy)를 정의하는 것입니다.

현재 public/join.html 에서 사용하는 Id와 password는 'email', 'password'이므로 위와 같이 정의해 줍니다.

또한 로그인 시, 해당 아이디와 비말번호가 맞는지를 확인하는 과정은 passport.use의 callback function에서

이루어지게 됩니다. (하지만 현재 과정에서는 아직 작성하지 않았습니다.)

## 3. passport 기반 router 설정

다음은, 이전에 passport.use 함수를 통해 정의 햇던 'local-join' 정책에 대한 결과를 passport를 통해 결정해

주는 기능을 추가해 보도록 하겠습니다.

코드는 다음과 같습니다.

	router.post('/', passport.autenticate('local-join', {

		// 'local-join' 정책이 성공할 시, /main 주소로 이동

		successRedirect : '/main',

		// 'local-join' 정책이 실패할 시, /join 주소로 이동 ( 회원 가입 주소)

		failureRedirect : '/join',

		failureFlash : true })
	
	);

기존에 정의해 놓은 'local-join' 정책의 callback function에서 성공과 실패를 결정해 반환해 주면 위의

passport.authenticate 함수를 통해 해당 정책의 성공, 실패 결과에 따른 페이지 이동을 정의해줄 수 있습니다.

## 4. local-strategy 콜백 함수의 기능 완성

이전에 정의해 놓은 'local-join' 정책에 대한 기능을 완전하게 구현해 보도록 하겠습니다.

먼저 기존 'local-join'의 callback function을 수정하도록 하겠습니다.

수정된 router_join.js 의 'local-join' 정책 코드는 보면 클라이언트가 페이지에서 이메일, 이름, 

비밀번호를 입력한 뒤,  회원 가입을 시도했을 때, 그에 대한 처리를 진행해 주는 코드입니다.

여기서 passport 인증의 진행 순서는 다음과 같습니다.

	1. router.get('/', function(req, res){...});
	
	2. passport.use('local-join', new LocalStrategy({...});

	3. router.post('/', passport.authenticate('local-join', {...});

	// 성공할 시, http://localhost:3000/main

	4. router.post('/', function(req, res){...});

	// 실패할 시, http://localhost:3000/join

	4. router.post('/', function(req, res){...});

2번 코드에서 클라이언트의 회원 가입이 성공할 경우, 3번에 true를, 실패할 경우, false를 전송하며

그에 따라 3번 코드에서 이동 경로를 결정해 줄 수 있습니다.

또한, 2번에서 3, 4 번으로 이동할 때, 입력된 코드와 같이 json 데이터를 같이 입력해 전송할 수도 있습니다.

## 05. passport 기반 세션처리

이전의 passport 정책을 통해 session을 사용하기 위해선 passport.serializeUser, passport.deserializeUser 메소드를

정의해줘야 합니다.

각 함수를 간단하게 구현하면 다음과 같습니다.

	passport.serializeUser(function(user, done){

		// DB query를 보내 얻은 insertId 값 출력

		console.log('passport session save : ', user.id);

		done(null, user.id);

	});

	passport.deserializeUser(function(id, done){
		
		// serializeUser 메소드의 done 메소드를 통해 보낸 user.id 출력

		console.log('passport session get id : ', id);

		done(null, id);

	});

또한 deserializeUser 메소드의 done 메소드에 id 변수를 추가할 경우, 다음 페이지에서 해당 id 변수 값을

express.get 메소드 내에서 req.user 변수로 사용할 수 있게 됩니다.


해당 사항은 router_main.js의 router.get 메소드에 포함되어 있으며 main.ejs 코드로 브라우저 화면에 표현합니다.

즉 04 번 진행과정에서 다음 과정이 추가 됩니다.

	5. passport.serializeUser(function(user, done){ ... });

	6. passport.deserializeUser(function(user, done){ ... });

	7. router_main.js 내 router.get(function(req, res){ ... });

이를 통해 로그인 다음 페이지까지 클라이언트의 정보를 가져갈 수 있습니다.
