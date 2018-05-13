'use strict';
var connection = require('../connection');

function getListOfAddress(callback) {
    connection.query('SELECT * from address_books', function (err, results) {
        if (err) {
            console.log('qwerrty');
            callback(null, JSON.stringify(err));
        } else {
            callback(null, JSON.stringify(results));
        }
    });
}


module.exports = {
    getListOfAddress: getListOfAddress
};


