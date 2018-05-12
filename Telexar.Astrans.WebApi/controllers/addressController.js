'use strict';

var async = require('async');
var addressService = require('../services/addressService');
var utils = require('../helpers/utils');

function getListOfAddress(req, res) {
    async.waterfall([
        function (callback) {
            addressService.getListOfAddress(function (err, result) {
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
    getListOfAddress: getListOfAddress
};