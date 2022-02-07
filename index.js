const express = require('express');
const bodyParser = require('body-parser');
const result = require('./result.json');

const app = express();

const token_jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ 
    extended: false
}));

app.listen('3000');
console.log('Node-Express server is running on port 3000');

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    const allowedOrigins = ['https://editor.swagger.io', 'https://hoppscotch.io'];
    const origin = req.headers.origin;
    
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    
    // Request methods you wish to allow eg: GET, POST, OPTIONS, PUT, PATCH, DELETE
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'Authorization', 'X-Requested-With,content-type');

    // Pass to next layer of middleware
    next();
});

// Authorization
app.post('/v1/auth', getToken);

function getToken(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    if(username === 'sumer' && password === 'abc123') {
        res.json({
            'access_token': token_jwt,
            'expires': '2012-04-23T18:25:43.511Z'
        });
    }
}

