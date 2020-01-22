document.querySelector('.AjaxSend').addEventListener('click', function(){
    var _input = document.forms[0].elements[0].value;
    console.log(_input);
    sendAjax('http://localhost:3000/ajax_search', _input);
})

function sendAjax(url, _data)
{
    var _newData = {'searchData' : _data};

    data = JSON.stringify(_newData);

    var xhr = new XMLHttpRequest();
    xhr.open('POST', url);

    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(data);
    xhr.addEventListener('load', function(){
        var _search = JSON.parse(xhr.responseText);
        if(_search.status !== "success")
        {
            document.querySelector(".SearchResult").innerHTML =
                                                "<h3> Search Fail </h3>"
        }
        else
        {
            document.querySelector(".SearchResult").innerHTML = 
                                                "<h3> Search Inform : " + _search.search + "</h3>";
        }
    })
}