var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var hostname = 'localhost';
var port = 3000;

var app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());


function auth(req, res, next){
    console.log(req.headers);

    var authHeader = req.headers.authorization;
    if ( !authHeader ) {
        var err = new Error('You ar not authorization');
        err.status = 401;
        next (err);
        return ;
    }

    var auth = new Buffer(authHeader.split(' ')[1],'base64').toString().split(':');
    var user = auth[0];
    var pass = auth[1];
console.log(user,pass);
    if( user == 'admin' && pass == '1' ){
        console.log('access success')
        next();

    }else {
        var err = new Error('You are not authenticated!');
        err.status = 401;
        next(err);
    }
}
app.use(express.static(__dirname + '/public'));
app.use(auth);



app.use(function(err, req, res, next){
    res.writeHead(err.status || 500, {
        'WWW-Authenticate':'Basic',
        'Content-Type': 'text/plain'
    });
    console.log(err.status);
    res.end(err.message);

})

app.listen(port, hostname, function(){
  console.log(`Server running at http://${hostname}:${port}/`);
});
