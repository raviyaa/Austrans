'use strict';

var async = require('async');
var userService = require('../services/userService');
var utils = require('../helpers/utils');

function getListOfUsers(req, res) {
    async.waterfall([
        function (callback) {
            userService.getListOfUsers(function (err, result) {
                if (err) {
                    callback(null, err);
                }
                callback(null, result);
            });
        }
    ], function (err, result) {
        utils.processResponse(err, result, res);
    });
}
function userLogin(req, res) {
    async.waterfall([
        function (callback) {
            console.log("inside the method");
            console.log(req.body);
            console.log(req.body.email);
            var user = {
                email: req.body.email,
                password: req.body.password
            }
            userService.userLogin(user, function (err, folios) {
                if (err) {
                    callback(null, "error");
                }

                callback(true, "true");
            });
        }
    ], function (err, result) {
        utils.processResponse(err, result, res);
    });
}
module.exports = {
    getListOfUsers: getListOfUsers,
    userLogin: userLogin
};