'use strict';

var async = require('async');
var itemService = require('../services/itemService');
var utils = require('../helpers/utils');

function getListPackageTypes(req, res) {
    async.waterfall([
        function (callback) {
            itemService.getListPackageTypes(function (err, result) {
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

function getListOfBookings(req, res) {
    async.waterfall([
        function (callback) {
            itemService.getListOfBookings(function (err, result) {
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
    getListPackageTypes: getListPackageTypes,
    getListOfBookings:getListOfBookings
};