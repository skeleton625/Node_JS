# 1. 인프런 Node.js 백엔드 자바스크립트의 이해 - NPM Project 시작하기

1. npm의 이해 및 개발 환경 설정

NPM : it easy for JavaScript developers to share and reuse code.

즉, 자바 스크립트에서 사용하는 용이한 코드들을 재사용하기위해 모아놓은 라이브러리

필자는 인프런 강의에서와 다르게 Windows 10 환경에서 작업을 진행했음.

Download Tools

	1. Visual Studio Code

	2. Node.js

npm 확인은 Powershell을 통해 npm 버전을 확인했으며 명령어는 다음과 같음.

	npm -v

npm 을 통해서 Node.js 초기화를 진행할 수 있으며 명령어는 다음과 같음.

	npm init

해당 명령어를 통해 기본적인 Node.js 환경이 설정됨.

기본적으로 이름(name), 버전(version), description, main, scripts, author, license를 정의함.

2. npm을 통한 기본적인 웹서버 구현

npm 을 통해 백엔드 서버 express를 설치해보도록 함. 명령어는 다음과 같음.

	npm install express --save

	# "--save"는 npm을 통해 다운받은 외부 라이브러리를 해당 폴더 내의 package.json에 저장하는 명령어로,

	# 다른 사람이 해당 프로젝트 폴더를 가져와 사용할 때, 사용하기 편의하도록 해줌.

위 명령어를 실행하면 package.json 파일에 express 정보가 표시됨.

또한 express를 설치하면 node_modules 폴더가 생성되며, 해당 폴더 내에 express와 곤련된 파일 및 폴더들이 생성됨.
