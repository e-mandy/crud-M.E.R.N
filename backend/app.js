var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors')

var usersRouter = require('./routes/datas');

var app = express();

app.use(cors({
    origin: 'http://192.168.86.101:5173'
}))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/datas', usersRouter);

module.exports = app;
