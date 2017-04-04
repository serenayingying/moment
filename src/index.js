var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var db = require('./model');
var sessionParser = require('./middleware/session');
var accountController = require('./controller/account');

var app = express();

app.use('/static', express.static(path.join(__dirname, 'public')));

// 解析 cookie
app.use(cookieParser());

// 解析 body 的中间件
app.use(bodyParser.json());

// 验证用户登录状态的中间件
app.use(sessionParser);

app.post('/register', accountController.register);
app.post('/login', accountController.login);
app.get('/session', accountController.loginSession);

db.init()
  .then(function () {
    app.listen(3000);
    console.log('Service started in port 3000.');
  });
