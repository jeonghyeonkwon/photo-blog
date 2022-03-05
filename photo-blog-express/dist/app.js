"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var dotenv = require("dotenv");
var sequelize = require('../models').sequelize;
var morgan = require('morgan');
dotenv.config();
var app = express();
var port = process.env.PORT;
app.use(morgan('dev'));
sequelize.sync({ force: false })
    .then(function () { console.log('연결 성공'); })
    .catch(function () { console.log('에러'); });
app.get('/', function (req, res) {
    console.log('서버 실행');
    res.send('hello world');
});
app.listen(port, function () {
    console.log("http://localhost:".concat(port));
});
//# sourceMappingURL=app.js.map