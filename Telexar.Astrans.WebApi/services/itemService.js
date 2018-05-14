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



module.exports = {
    getListPackageTypes: getListPackageTypes
};


