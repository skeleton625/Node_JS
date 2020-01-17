# Node.js 백엔드 강의 - Request, Response 처리 기본

## 1. POST 요청처리

html 내에서 POST 방식으로 메시지를 서버에 선송하면 node.js 서버에서 해당 메시지를 받아

POST 방식으로 처리할 수가 있음.

	''

	app.post('/email_post', function(req, res){
	
		res.send("post_response")
	
	})

	''

위 코드는 html 코드에서 form 태그의 action 속성이 "email_post"일 경우, input_submit 버튼을

클릭하게 되면, 해당 정보를 http://localhost:3000/email_post 로 전송하게 됨.

하지만 현재 코드만 가지고 POST 방식으로 전송한 데이터를 받을 수 없기 때문에 추가적 모듈이 필요함.

	> npm install body-parser

npm에서 body-parser 모듈을 다운 받으면 해당 모듈을 통해 POST 방식의 데이터를 받을 수 있음.

또한, body-parser 모듈을 사용하기 위해 node.js 코드 내에 다음과 같이 정의를 해줘야 함.

	''

	var bodyParser = require('body-parser')

	app.use(bodyParser.json())

	app.use(bodyParser.urlencoded({extended:true}))

	''
첫 번째 코드는 bodyParser를 통해 들어온 POST 데이터가 json 양식일 경우에 반응하는 코드이고

두 번째 코드는 bodyParser를 통해 들어온 POST 데이터가 json 이외의 양식일 경우 반응하는 코드이다.

"urlencoded({extended:true})"는 인코딩된 데이터들을 처리하기 위함임.

위의 과정을 거치면 body-parser 모듈을 통해 POST 방식의 데이터를 파악할 수 있게 됨.

	''

	app.post('/email_post', function(req, res){
		
		console.log(req.body.email)

	})

	''
위의 "req.body.email"을 통해 클라이언트가 POST 방식으로 전송한 email 데이터를 서버에서 확인할 수 있음.

## 2. View engine을 활용한 응답처리

클라이언트가 제공한 데이터를 섞어 적당한 View html을 보여주기 위해 EJS 모듈을 사용할 예정임.

	> npm install ejs --save

ejs 모듈은 node.js 서버에서 코드로 다음과 같이 사용할 수가 있음.

	''
	app.set('view engine', 'ejs')

	''
해당 코드는 즉, ejs 모듈은 뷰 엔진(view engine)으로 사용하겠다고 정의하는 것을 의미함.

뷰 엔진의 경우, 뷰만의 폴더가 "절대 경로 + /views" 로 이미 정의가 되어 있는 상태입.

그렇기 때문에 views 폴더를 만들어 view html 파일(../views/email.ejs)을 해당 폴더 내에 생성해 줘야 함.

그 다음, node.js 서버에서 다음과 같이 정의를 해줌.

	''

	app.post('/email_post', function(req, res){
	
		res.render('email.ejs', {'email' : req.body.email})

	})

	''
위 코드의 내용은 POST 방식의 요청(request)에 대해 email.ejs (View engine) 파일을 보여주면서

"req.body.email"에 대한 정보를 email 변수로 정의하겠다는 것을 의미함.

### 참고
	
	EJS 모듈 이외에도 Pug, Mustache 등의 View Engine이 존재한다.

	자세한 것은 Express 페이지에 존재함. (또는 검색)

	또한, 현재까지 package.json 파일을 통해 node_modules 폴더가 없어도 설치한 모듈들을

	파악 및 설치할 수 있음.

## 3. JSON 을 활용한 Ajax 처리

public/form.html에서 Ajax를 사용해 JSON 데이터를 전송하도록 하는 예재를 진행할 것임.

예제 코드에 대한 사항이 많기 때문에, public/form.html 파일과 public/main.js 파일로 대체함.

코드를 완성하고 실행해 보면 처리 과정은 다음과 같음을 알 수가 있다.

	1. 클라이언트 브라우저
	
	2. 서버 app.post('ajax_send_email', ...)

	3. form.html의 script 태그

	4. main.js의 sendAjax 함수

	5. 처리된 결과를 form.html에 비동기로 출력
