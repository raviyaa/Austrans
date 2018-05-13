/* eslint-disable strict */
'use strict';
var errors = require('common-errors'),
    httpStatus = require('http-status');

var DEFAULT_LIMIT = require('../config/config').RECORDS_PER_REQUEST;


/**
* This method is responsible for writing err/response to response
*
* @param   {Object}    err       error from endpoint processing if any
* @param   {Object}    result    result from endpoint processing if any
* @param   {Object}    response  http response object
*/
function processResponse(err, result, response) {
    
  if (result) {
    response.status(httpStatus.OK).json(result).end();
  } else {
    response.status(err.statusCode).json({ message: err.message }).end();
  }
}

/*function processResponse(err, result, response) {
  console.log(':::::::::::::::::::');
  console.log(err);
  if (result) {
    response.status(httpStatus.OK).json(result).end();
  } else {
    response.status(err.statusCode).json({ message: err.message }).end();
  }
}*/

/**
* This method creates pagination parameter from
* query parameters in the request
*
* @param   {Object}    params  swagger params obtained from request
* @returns {Object}    object having pagination related parameters
*/
function getPaginationParams(params) {
  var paginationParams = { limit: DEFAULT_LIMIT, skip: 0 };
  if (params.offset && params.offset.value) {
    paginationParams.skip = parseInt(params.offset.value, 10);
  }
  return paginationParams;
}

/**
* This method is responsible for converting mongodb error
* to generic http error
*
* @param   {Object}    err  mongodb error object
*/
function handleMongodbError(err) {
  var httpError = null;
  if (err.name === 'CastError') {
    httpError = new errors.HttpStatusError(httpStatus.BAD_REQUEST, 'Invalid parameter '+err.path);
  } else if (err.name === 'ValidationError') {
    var mongoErrors = err.errors;
    var errorDesc = '';
    if (mongoErrors && Object.keys(mongoErrors).length > 0) {
      errorDesc = 'Invalid '+mongoErrors[Object.keys(mongoErrors)[0]].path;
    }
    httpError = new errors.HttpStatusError(httpStatus.BAD_REQUEST,
      err.message+ ' '+errorDesc);
  } else {
    httpError = new errors.HttpStatusError(httpStatus.INTERNAL_SERVER_ERROR, 'Internal error processing the request');
  }

  return httpError;
}


module.exports = {
  processResponse: processResponse,
  getPaginationParams: getPaginationParams,
  handleMongodbError: handleMongodbError
};
