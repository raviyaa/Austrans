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

function addAddress(req, res) {
    async.waterfall([
        function (callback) {
            var addressObj = {
                reference: req.body.ref,
                company_name: req.body.companyName,
                first_name: req.body.fName,
                last_name: req.body.lName,
                address: req.body.address,
                email: req.body.email,
                phone: req.body.phone
            };
            addressService.addAddress(addressObj, function (err, result) {
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
    getListOfAddress: getListOfAddress,
    addAddress: addAddress
};