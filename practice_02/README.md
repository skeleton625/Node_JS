# Request, Response 처리 기본

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


