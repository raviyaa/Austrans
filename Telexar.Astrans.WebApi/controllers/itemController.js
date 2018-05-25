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

function getListOfBookingsById(req, res) {
    async.waterfall([
        function (callback) {
            itemService.getListOfBookingsById(req.params.id, function (err, result) {
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

function addBooking(req, res) {
    async.waterfall([
        function (callback) {
            var bookObj = req.body;
            bookObj.api_booking_number = "APB" + Math.floor(Math.random() * 1000000000);
            bookObj.consignment_number = bookObj.api_booking_number;
            itemService.addBooking(bookObj, function (err, result) {
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
    getListOfBookings: getListOfBookings,
    getListOfBookingsById: getListOfBookingsById,
    addBooking: addBooking
};