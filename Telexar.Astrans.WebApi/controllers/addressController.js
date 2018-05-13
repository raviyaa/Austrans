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

function deleteAddress(req, res) {
    async.waterfall([
        function (callback) {
            addressService.deleteAddress(req.body, function (err, result) {
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

function editAddress(req, res) {
    async.waterfall([
        function (callback) {
            var addressObj = {
                id: req.body.id,
                reference: req.body.ref,
                company_name: req.body.companyName,
                first_name: req.body.fName,
                last_name: req.body.lName,
                address: req.body.address,
                email: req.body.email,
                phone: req.body.phone
            };
            addressService.editAddress(addressObj, function (err, result) {
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
    addAddress: addAddress,
    deleteAddress: deleteAddress,
    editAddress: editAddress
};