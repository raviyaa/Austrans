'use strict';
var connection = require('../connection');

function getListPackageTypes(callback) {
    connection.query('SELECT * from packages', function (err, results) {
        if (err) {
            callback(null, JSON.stringify(err));
        } else {
            callback(null, JSON.stringify(results));
        }
    });
}

function getListOfBookings(callback) {
    connection.query('SELECT * from api_bookings', function (err, results) {
        if (err) {
            callback(null, JSON.stringify(err));
        } else {
            callback(null, JSON.stringify(results));
        }
    });
}



module.exports = {
    getListPackageTypes: getListPackageTypes,
    getListOfBookings:getListOfBookings
};


