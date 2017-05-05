var express = require('express');
var fs = require('fs');
var https = require('https');
var app = express();

app.use(express.static('public'));

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var options = {
   key  : fs.readFileSync('key.pem'),
   cert : fs.readFileSync('cert.pem')
};

var port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.render('/');
});

if(process.env.NODE_ENV === 'development') {
    https.createServer(options, app).listen(port, () => {
        console.log(`Server started on port ${port}`);
    });
} else {
    app.listen(port, () => {
        console.log(`Server started on port ${port}`);
    });
}
