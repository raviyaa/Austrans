'use strict';
var connection = require('../connection');

function getListOfInvoice(callback) {
    connection.query('SELECT * from invoices', function (err, results) {
        if (err) {
            callback(null, JSON.stringify(err));
        } else {
            callback(null, JSON.stringify(results));
        }
    });
}

function getListInvoicesById(id, callback) {
    connection.query('SELECT * from invoices WHERE user_id=? ', [id], function (error, results) {
        if (error) {
            callback(null, JSON.stringify(error));
        } else {
            callback(null, JSON.stringify(results));
        }
    });
}

module.exports = {
    getListOfInvoice: getListOfInvoice,
    getListInvoicesById:getListInvoicesById
};


