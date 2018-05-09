'use strict';
var errors = require('common-errors'),
    httpStatus = require('http-status');

function processResponse(err, result, response) {

    if (result) {
        response.status(httpStatus.OK).json(result).end();
    } else {
        response.status(err.statusCode).json({ message: err.message }).end();
    }
}

module.exports = {
    processResponse: processResponse
  };