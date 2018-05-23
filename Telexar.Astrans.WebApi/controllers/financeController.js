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

function getListInvoicesById(req, res) {
    async.waterfall([
        function (callback) {
            financeService.getListInvoicesById(req.params.id, function (err, result) {
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

function getListInvoicesByIdAndStatus(req, res) {
    async.waterfall([
        function (callback) {
            financeService.getListInvoicesByIdAndStatus(req.params.id, function (err, result) {
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

function addPayment(req, res) {
    async.waterfall([
        function (callback) {
            var paymentObj = req.body;
            paymentObj.transaction_id = "PAY-" + Math.random() * 1000000000;
            paymentObj.status = 'completed'
            financeService.addPayment(paymentObj, function (err, result) {
                if (err) {
                    callback(null, err);
                }
                callback(null, result);
            });
        },
        function (payment, callback) {
            var invoiceObj = {
                id: req.body.invoice_id,
                transaction_status: "completed",
                outstanding_price: 0.00
            };
            financeService.updateInvoice(invoiceObj, function (err, result) {
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
    getListOfInvoice: getListOfInvoice,
    getListInvoicesById: getListInvoicesById,
    getListInvoicesByIdAndStatus: getListInvoicesByIdAndStatus,
    addPayment: addPayment
};