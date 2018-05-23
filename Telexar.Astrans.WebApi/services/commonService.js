'use strict';
var connection = require('../connection');

function getListOfCountries(callback) {
    connection.query('SELECT * from countries', function (err, results) {
        if (err) {
            callback(null, JSON.stringify(err));
        } else {
            callback(null, JSON.stringify(results));
        }
    });
}

module.exports = {
    getListOfCountries: getListOfCountries
};


