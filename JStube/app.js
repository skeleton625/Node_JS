var download_path = 'D:/Download/YouTube/';
var path = require('path');
var express = require('express');
var body_parser = require('body-parser');

var fs = require('fs')
var ffmpeg = require('ffmpeg');
var youtube_dl = require('youtube-dl');

var app = express();
app.use(express.static('public'));
app.use(body_parser.urlencoded({extended:true}))

app.listen(3000, () =>{
    console.log('Port 3000 Server started ! ! ! ');
});

app.get('/', (req, res) =>{
    res.sendFile(__dirname + '/public/downloader.html');
});

app.post('/download', (req, res)=>{
    var URL = req.body.URL;
    // 경로 정의
    var name = path.join(download_path,req.body.name);

    var video = youtube_dl(URL,
        ['--extract-audio',
         '--audio-format=mp3'],
        { cwd: __dirname });

    video.on('info', function(info) {
        console.log('Mp4 Download End, And Translate initiate')
        try {
            var process = new ffmpeg(name+'.mp4');
            process.then(function (video) {
                video.fnExtractSoundToMP3(name+'.mp3', function (error, file) {
                    if (!error)
                        console.log('Result Audio file: ' + file);
                    else
                        console.log(error);
                    fs.unlink(name+'.mp4', (err)=>{
                        if(err) throw err;
                    });
                });
            }, function (err) {
                console.log('Error: ' + err);
            });
        } catch (e) {
            console.log(e.code);
            console.log(e.msg);
        }
    });

    video.pipe(fs.createWriteStream(name+'.mp4'));
    res.sendFile(__dirname + '/public/downloader.html');
});