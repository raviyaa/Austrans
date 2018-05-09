'use strict';
var connection = require('../connection');

function getListOfUsers(callback) {
    console.log("service calleed");
    connection.query('SELECT * from user', function (err, rows, fields) {
        connection.end();
        if (!err)
            console.log('The solution is: ', rows);
        else
            console.log('Error while performing Query.');
    });
}

module.exports = {
    getListOfUsers: getListOfUsers
};