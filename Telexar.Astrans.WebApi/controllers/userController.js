'use strict';

var async = require('async');
var bcrypt = require('bcrypt');
var _ = require('lodash');
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
            userService.userLogin(req.body, function (err, result) {
                if (err) {
                    callback(null, err);
                }
                callback(null, result);
            });
        },
        function (user, callback) {
            if (!_.isEmpty(user)) {
                if (JSON.parse(user)[0]) {
                    var hash = JSON.parse(user)[0];
                    var newpwd = hash.password.replace('$2y$', '$2a$');
                    bcrypt.compare(req.body.password, newpwd, function (err, res) {
                        if (err) {
                            var result = {};
                            result.status = 'error';
                            result.result = err;
                            callback(null, result);
                        }
                        var result = {};
                        result.status = 'OK';
                        result.result = user;
                        callback(null, result);
                    });
                } else {
                    var result = {};
                    result.status = 'error';
                    result.result = null;
                    callback(null, result);
                }

            } else {
                var result = {};
                result.status = 'error';
                result.result = null;
                callback(null, result);
            }

        }
    ], function (err, result) {
        utils.processResponse(err, result, res);
    });
}

function updateUser(req, res) {
    async.waterfall([
        function (callback) {
            var userObj = {
                id: req.body.id,
                company_name: req.body.companyName,
                first_name: req.body.fName,
                last_name: req.body.lName,
                address1: req.body.address,
                email: req.body.email,
                phone: req.body.phone
            };
            userService.updateUser(userObj, function (err, result) {
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

function getUserById(req, res) {
    async.waterfall([
        function (callback) {
            console.log("dfusbfd"+req.params.id);
            userService.getUserById(req.params.id, function (err, result) {
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

module.exports = {
    getListOfUsers: getListOfUsers,
    userLogin: userLogin,
    updateUser: updateUser,
    getUserById: getUserById
};