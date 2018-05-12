var express = require('express'),
    app = express(),
    router = require('./router'),
    port = process.env.PORT || 3000;

var bodyParser = require('body-parser'),
    cors = require('cors'),
    compression = require('compression'),
    logger = require('./helpers/logger'),
    responseTransformer = require('./middlewares/ResponseTransformer'),
    errorHandler = require('./middlewares/ErrorHandler'),
    responser = require('./middlewares/Responser');


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(responseTransformer());
app.use(responser());
app.use(compression());
app.use(errorHandler());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
    //res.header("Access-Control-Allow-Credentials", "true");
    next();
});
app.use(router());
app.listen(port);

console.log('todo list RESTful API server started on: ' + port);