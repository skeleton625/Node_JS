# 1. 인프런 Node.js 의 이해 - NPM Project 시작하기

## 1. npm의 이해 및 개발 환경 설정

NPM : it easy for JavaScript developers to share and reuse code.

즉, 자바 스크립트에서 사용하는 용이한 코드들을 재사용하기위해 모아놓은 라이브러리

필자는 인프런 강의에서와 다르게 Windows 10 환경에서 작업을 진행했음.

Download Tools

	1. Visual Studio Code

	2. Node.js

npm 확인은 Powershell을 통해 npm 버전을 확인했으며 명령어는 다음과 같음.

	> npm -v

npm 을 통해서 Node.js 초기화를 진행할 수 있으며 명령어는 다음과 같음.

	> npm init

해당 명령어를 통해 기본적인 Node.js 환경이 설정됨.

기본적으로 이름(name), 버전(version), description, main, scripts, author, license를 정의함.

## 2. npm을 통한 기본적인 웹서버 구현

npm 을 통해 백엔드 서버 express를 설치해보도록 함. 명령어는 다음과 같음.

	> npm install express --save

	# "--save"는 npm을 통해 다운받은 외부 라이브러리를 해당 폴더 내의 package.json에 저장하는 명령어로,

	# 다른 사람이 해당 프로젝트 폴더를 가져와 사용할 때, 사용하기 편의하도록 해줌.

위 명령어를 실행하면 package.json 파일에 express 정보가 표시됨.

또한 express를 설치하면 node_modules 폴더가 생성되며, 해당 폴더 내에 express와 곤련된 파일 및 폴더들이 생성됨.

# 2. 인프런 Node.js 의 이해 - Express 기반 웹서버 구동

인프런 강의에서 제공한 코드를 통해 app.js 파일을 구현함.

해당 파일은 VScode에서 Terminal을 통해 다음 명령어로 실행이 가능함.

	> node app.js

위 명령어를 통해 "app.js"코드 내에 "app.listen" 함수가 반복해서 동작하고 있음.

Node.js에서 서버 콜백 함수들은 거의 비동기 방식으로 진행됨.

즉, 다음과 같이 진행을 실행을 통해 확인할 수 있음.

	1. app.listen 함수를 실행 -> 서버에 클라이언트가 들어올 때까지 대기

	2. 클라이언트가 들어오지 않아도 다음 줄(console.log('end of Server code . . .'))을 실행함

### 참고
	nodemon
		
		서버 코드의 변화를 감지하고 서버를 재실행시켜주는 모듈로 설치 명령어는 다음과 같음

		> npm install nodemon --save

		> npm install nodemon --g

		# '--g' 의 경우, 모든 디렉토리에서 nodemon을 접근할 수 있도록 설정해주는 명령어

		# Linux 및 Mac 에서는 관리자 권한(sudo)이 필요함.

# 3. 인프런 Node.js 의 이해 - URL Routing 처리

## 1. GET 방식 처리

클라이언트가 서버로 들어올 시, Node.js 에서 GET 방식으로 클라이언트를 처리할 수 있음

	app.get('/', function(req, res){
		
		res.send("hello friend!");
	
	})

또한, res.send 함수 내에 html 코드를 입력해서 사용할 수도 있음.

	app.get('/', function(req, res){
	
		res.send("<h1>hello friend!</h1>")
	
	})

## 2. 서버 내 다른 파일들 접근

클라이언트가 서버 내의 다른 파일에 접근하기 위해선 Node.js에서 그 파일에 대한 접근 방법을 정의해 줘야 함.

	''
		res.sendFile(절대 경로)		// res.send를 대체

	''

여기서 "절대 경로"의 경우, 실제 절대 경로를 입력할 수도 있지만 Node.js 내에 정의되어 있는 "__dirname" 변수를 통해

정의할 수도 있음.

"__dirname"은 현재 app.js가 위치한 최상위 경로를 나타내는 변수임.

	''

		linux, unix path : res.sendFile(++dirname + "/public/main.html/)

	''


