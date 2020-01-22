var Express = require('express')
var App = Express()
var BodyParser = require('body-parser')

App.listen(3000, function(){
    console.log('Server is Running . . .')
})

App.use(Express.static('public'))
App.use(BodyParser.json())
App.use(BodyParser.urlencoded({extended:true}))

App.get('/search', function(req, res){
    res.sendFile(__dirname+"/public/search.html")
})

App.post('/ajax_search', function(req, res){
    var _response = {'status' : 'success', 'search' : req.body.searchData}

    res.json(_response)
    console.log('Json data is sent. . .')
})