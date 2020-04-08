global.basePath = __dirname;
const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const session = require('express-session')
const requestDispatcher = require('./routes/router')
const app = express()
const cors = require('cors')
app.use(cors())

const ROOT_PATH = process.cwd();
require('best-require')(ROOT_PATH, {
    utils: ROOT_PATH + '/utils',
    controllers: ROOT_PATH + '/application/apis/controllers'
});

app.use(session({
    secret: 'hubwiz app', //secret的值建议使用随机字符串
    cookie: { maxAge: 60 * 1000 * 60 } // 过期时间（毫秒）
}))

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser({ uploadDir: './uploads' }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))


app.use('/', requestDispatcher)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    const err = new Error('Not Found')
    err.status = 404
    next(err)
})

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    // render the error page
    res.status(err.status || 500)
    res.render('error')
})

module.exports = app
