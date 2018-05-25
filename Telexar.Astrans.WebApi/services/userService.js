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
    connection.query('SELECT * from users WHERE email=? ', [user.email], function (error, results) {
        if (error) {
            callback(null, JSON.stringify(error));
        } else {
            callback(null, JSON.stringify(results));
        }
    });
}

function updateUser(user, callback) {
    console.log(user);
    user.updated_at = new Date();
    connection.query('UPDATE users SET ? WHERE id = ?', [user, user.id], function (error, results) {
        if (error) {
            console.log(error);
            var result = {};
            result.status = 'error';
            result.result = null;
            callback(null, result);
        } else {
            console.log(results);
            var result = {};
            result.status = 'OK';
            result.result = user;
            callback(null, result);
        }
    });
}

function getUserById(id, callback) {
    connection.query('SELECT * from users WHERE id=? ', [id], function (error, results) {
        if (error) {
            callback(null, JSON.stringify(error));
        } else {
            callback(null, JSON.stringify(results));
        }
    });
}

module.exports = {
    getListOfUsers: getListOfUsers,
    userLogin: userLogin,
    updateUser: updateUser,
    getUserById: getUserById
};


