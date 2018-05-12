'use strict';
var connection = require('../connection');

function getListOfUsers(callback) {
    connection.query('SELECT * from users', function (err, results) {
        if (err) {
            callback(null, JSON.stringify(err));
        } else {
            callback(null, JSON.stringify(results));
        }
    });
}

function userLogin(user, callback) {
    connection.query('SELECT * from users', function (error, results) {
        if (error) {
            console.log(error);
        } else {
            console.log(JSON.stringify(results));
        }
    });
}

module.exports = {
    getListOfUsers: getListOfUsers,
    userLogin: userLogin
};


