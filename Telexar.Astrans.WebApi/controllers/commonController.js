'use strict';

var async = require('async');
var commonService = require('../services/commonService');
var utils = require('../helpers/utils');

function getListOfCountries(req, res) {
    async.waterfall([
        function (callback) {
            commonService.getListOfCountries(function (err, result) {
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
    getListOfCountries: getListOfCountries
};