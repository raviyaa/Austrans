var express = require('express');


var userController = require('./controllers/userController');
var addressController = require('./controllers/addressController');

module.exports = function () {

    var options = {
        caseSensitive: true
    };

    // Instantiate an isolated express Router instance
    var router = express.Router(options);  
    
    router.get('/getUsers', userController.getListOfUsers);
    router.get('/getListOfAddress', addressController.getListOfAddress);
    router.post('/userLogin', userController.userLogin);
    
    return router;
};


