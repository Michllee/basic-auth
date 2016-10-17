/**
 * Created by liyang9 on 2016/10/17.
 */
var express = require('express');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');

var hostname = 'localhost';
var port = 3000;

var app = express();


app.use(morgan('dev'));

app.use(cookieParser('12345-67890-09876-54321'));

function auth (req, res, next){
    if(!req.signedCookies.user) {
        var authHeader = req.headers.authorization;
        if(!authHeader) {
            var err = new Error('you are not authenticated!');
            err.status = 401;
            next(err);
            return;
        }


        console.log(req.headers.authorization);
        var auth = new Buffer(authHeader.split(' ')[1], 'base64').toString().split(':');
        var user = auth[0];
        var passwd = auth[1];

        if (user == 'admin' && passwd == 'admin'){
            res.cookie('user','admin',{signed:true);
            next();
        }else {
            if(req.signedCookies.user == 'admin') {
                next();
            }else {
                var  err = new Error('You are not authenticated!');
                err.status = 401;
                next(err);
            }

        }
    }
}

app.use(auth);
app.use(express.static(__dirname + '/public'));

app.use(function (err, req, res, next) {
    res.writeHead(err.status || 500, {
        'WWW-Authenticate':'Basic',
        'Content-Type': 'text/plain'
    });
    res.end(err.message);
});

app.listen(port, hostname, function () {
    console.log(`Server running at http://${hostname}:${port}`);
});
