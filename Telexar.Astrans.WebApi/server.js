var express = require('express'),
    app = express(),
    router = require('./router'),
    port = process.env.PORT || 3000;
/* var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'springdatatestdb'
});
//var app = express(); */
app.use(router());
/* connection.connect(function (err) {
    if (!err) {
        console.log("Database is connected ... nn");
    } else {
        console.log("Error connecting database ... nn");
    }
});
 */
app.listen(port);

console.log('todo list RESTful API server started on: ' + port);