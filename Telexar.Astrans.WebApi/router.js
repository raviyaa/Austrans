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
    router.post('/userLogin', userController.userLogin);

    router.post('/addAddress', addressController.addAddress);
    router.get('/getListOfAddress', addressController.getListOfAddress);
    
    return router;
};


