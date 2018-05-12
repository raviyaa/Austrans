'use strict';

var async = require('async');
var userService = require('../services/userService');
var utils = require('../helpers/utils');
function getListOfUsers(req, res) {
    async.waterfall([
        function (callback) {
            console.log("inside the method");
            userService.getListOfUsers(function (err, folios) {
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
    getListOfUsers: getListOfUsers
};