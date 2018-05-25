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

function getListInvoicesByIdAndStatus(id, callback) {
    connection.query('SELECT * from invoices WHERE user_id=? AND transaction_status=?', [id, 'pending'], function (error, results) {
        if (error) {
            callback(null, JSON.stringify(error));
        } else {
            callback(null, JSON.stringify(results));
        }
    });
}


function addPayment(obj, callback) {
    obj.created_at = new Date();
    obj.updated_at = new Date();
    connection.query('INSERT INTO finance_transactions SET ?', obj, function (err, results) {
        if (err) {
            console.log(JSON.stringify(err));
            callback(null, JSON.stringify(err));
        } else {
            console.log(JSON.stringify(results));
            callback(null, JSON.stringify(results));
        }
    });
}

function updateInvoice(invoice, callback) {
    invoice.updated_at = new Date();
    connection.query('UPDATE invoices SET ? WHERE id = ?', [invoice, invoice.id], function (error, results) {
        if (error) {
            console.log(JSON.stringify(err));
            callback(null, JSON.stringify(error));
        } else {
            console.log(JSON.stringify(results));
            callback(null, JSON.stringify(results));
        }
    });
}

module.exports = {
    getListOfInvoice: getListOfInvoice,
    getListInvoicesById: getListInvoicesById,
    getListInvoicesByIdAndStatus: getListInvoicesByIdAndStatus,
    addPayment: addPayment,
    updateInvoice: updateInvoice
};


