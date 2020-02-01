console.log("this is javascript!!");

// Ajax에 대한 처리 JQuery 함수
document.querySelector('.ajax_send').addEventListener('click', function(){
    /*
        forms[0]    -> 첫 번째 form 태그를 의미
        elements[0] -> 첫 번째 form 태그의 input 태그를 의미
        value       -> 첫 번재 form 태그의 input 태그에 값(email)을 의미
    */
    var input_data = document.forms[0].elements[0].value
    // sendAjax 함수를 사용해 "http://localhost:300/ajax_send_email" 주소로 input_data를 전송
    sendAjax('http://localhost:3000/email/ajax', input_data)
})

function sendAjax(url, data)
{
    // JSON 데이터 정의
    var data = {'email' : data};
    // JSON 데이터를 문자열로 변경
    data = JSON.stringify(data);
    // url 주소를 POST 방식으로 개방
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    // Content-Type을 json 타입으로 정의 -> JSON 데이터를 전송할 것이기 때문
    xhr.setRequestHeader('Content-Type', "application/json");
    // data 문자열 변수를 전송(서버와 데이터를 주고받을 때는 데이터가 문자열이어야 함.)
    xhr.send(data);
    // 데이터가 정상적으로 전송되었을 경우, 반응 텍스트를 출력
    xhr.addEventListener('load', function(){
        // 서버 반응 결과로 온 Json 파일을 Parsing
        var result = JSON.parse(xhr.responseText);
        // 결과를 출력할 div 태그 정의
        var result_div = document.querySelector(".result");

        // DB 내에 email이 존재하지 않을 경우, "Fail"을 태그 내에 출력
        if(result.result !== "ok")
            result_div.innerHTML = "<h2>Fail</h2>";
        // DB 내에 email이 존재할 경우, "Success : 'email 주인 이름'"을 태그 내에 출력
        else
            result_div.innerHTML = "<h2>Success : </h2>" + result.name;
    });
}
