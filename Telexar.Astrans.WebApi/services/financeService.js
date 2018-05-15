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
module.exports = {
    getListOfInvoice: getListOfInvoice
};


