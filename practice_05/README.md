# 4. Node.js Router 개선 - 모듈화

기존 app.js 에 존재하던 app.get 또는 app.post 등의 기능들을 모듈화할 수 있습니다.

그러기 위해서 먼저 router 폴더를 생성한 뒤, router_main.js 파일을 생성해 줍니다.

여기서 Node.js 기능을 사용하기 위해 app.js 코드와 마찬가지로 다음의 코드를 추가해 줍니다.

	''

	var express = require('express');

	var router = express.router();

	''

여기서 router 객체는 router_main.js 파일을 app.js 에서 모듈로 사용할 수 있도록 하기 위해

정의해둔 객체입니다.

다음, Node.js 서버에서 사용할 get, post 함수를 router 객체를 통해 정의합니다.

	''

	var path = require('path')

	router.get('/', function(req, res){

		res.sendFile(path.join(__dirname, '../public/main.html'));

	});

	''

여기서 path 객체는 주소의 절대 겅료를 상대 경로처럼 정의할 수 있도록 해주는 모듈입니다.

위 코드처럼 path.join(절대 경로, 상대 경로) 로 사용하면 절대 경로와 상대 경로를 합쳐

절대 경로로 만들어 줍니다.

마지막으로 router_main.js 파일을 모듈처럼 사용할 수 있도록 아래와 같은 코드를 추가해 줍니다.

	''

	module.exports = router;

	''

이 코드를 통해서 router_main.js 파일을 app.js 파일에서 모듈 형태롤 사용할 수 있게 됩니다.

app.js 파일에서 router_main.js 파일을 사용하기 위해선 다음과 같은 코드가 필요합니다.

	''
	...

	var main = require('./router/router_main');

	app.use('/main', main);

	''

위의 코드를 통해 router_main.js에서 정의된 get, post 함수를app.js 실행을 통해 사용할 수 있게

되며, 경로는 app.js 경로에서 '/main' 을 추가한 경로를 통해 사용할 수 있게 됩니다.

필자는 이와 같은 방식을 통해서 router_form.js 파일도 구현해 봤습니다.
