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


function getListOfAddressesById(id, callback) {
    connection.query('SELECT * from api_bookings WHERE id=? ', [id], function (error, results) {
        if (error) {
            callback(null, JSON.stringify(error));
        } else {
            callback(null, JSON.stringify(results));
        }
    });
}

function getListOfBookingsById(id, callback) {
    connection.query('SELECT * from api_bookings WHERE user_id=? ', [id], function (error, results) {
        if (error) {
            callback(null, JSON.stringify(error));
        } else {
            callback(null, JSON.stringify(results));
        }
    });
}

function addBooking(obj, callback) {
    connection.query('INSERT INTO api_bookings SET ?', obj, function (err, results) {
        if (err) {
            callback(null, JSON.stringify(err));
            console.log(JSON.stringify(err));
        } else {
            console.log(JSON.stringify(results));
            callback(null, JSON.stringify(results));
        }
    });
}


module.exports = {
    getListPackageTypes: getListPackageTypes,
    getListOfBookings: getListOfBookings,
    getListOfBookingsById: getListOfBookingsById,
    addBooking: addBooking
};


