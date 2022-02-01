const { response } = require('express')
var express = require('express')
var result = require('./result.json')
var app = express()

app.listen('3000')
console.log('Express server is running on port 3000')

app.get('/v1/weather', getWeather)
app.get('/v1/hello', getGreeting)
app.post('/v1/auth', getToken)

function getWeather(request, response) {
    response.json(result)
}

function getGreeting(req, res) {
    return res.send(200, { message: 'Hallo Swagger!' });
}

function getToken(req, res) {
    return res.send(200, { token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c' })
}

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
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Pass to next layer of middleware
    next();
});

