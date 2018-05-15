'use strict';

var async = require('async');
var financeService = require('../services/financeService');
var utils = require('../helpers/utils');

function getListOfInvoice(req, res) {
    async.waterfall([
        function (callback) {
            financeService.getListOfInvoice(function (err, result) {
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
    getListOfInvoice: getListOfInvoice
};