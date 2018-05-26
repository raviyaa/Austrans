'use strict';
var connection = require('../connection');

function getListOfAddress(callback) {
    connection.query('SELECT * from address_books WHERE user_id=13', function (err, results) {
        if (err) {
            callback(null, JSON.stringify(err));
        } else {
            callback(null, JSON.stringify(results));
        }
    });
}

function addAddress(obj, callback) {
    obj.created_at = new Date();
    obj.updated_at = new Date();
    connection.query('INSERT INTO address_books SET ?', obj, function (error, results) {
        if (error) {
            console.log(JSON.stringify(error));
            callback(null, JSON.stringify(error));
        } else {
            console.log(JSON.stringify(results));
            callback(null, JSON.stringify(results));
        }
    });
}

function deleteAddress(obj, callback) {
    connection.query('DELETE FROM address_books WHERE id=?', [obj.id], function (error, results) {
        if (error) {
            console.log(JSON.stringify(error));
            callback(null, JSON.stringify(error));
        } else {
            console.log(JSON.stringify(results));
            callback(null, JSON.stringify(results));
        }
    });
}

function editAddress(obj, callback) {
    console.log(obj);
    obj.updated_at = new Date();
    connection.query('UPDATE address_books SET ? WHERE id = ?', [obj, obj.id], function (error, results) {
        if (error) {
            console.log(JSON.stringify(error));
            callback(null, JSON.stringify(error));
        } else {
            console.log(JSON.stringify(results));
            callback(null, JSON.stringify(results));
        }
    });
}

function getListOfAddressesById(id, callback) {
    connection.query('SELECT * from address_books WHERE user_id=? ', [id], function (error, results) {
        if (error) {
            callback(null, JSON.stringify(error));
        } else {
            callback(null, JSON.stringify(results));
        }
    });
}

function getListOfRecentAddressesById(id, callback) {
    connection.query('SELECT * from recent_address_books WHERE user_id=? ', [id], function (error, results) {
        if (error) {
            callback(null, JSON.stringify(error));
        } else {
            callback(null, JSON.stringify(results));
        }
    });
}


module.exports = {
    getListOfAddress: getListOfAddress,
    addAddress: addAddress,
    deleteAddress: deleteAddress,
    editAddress: editAddress,
    getListOfAddressesById: getListOfAddressesById,
    getListOfRecentAddressesById: getListOfRecentAddressesById
};


