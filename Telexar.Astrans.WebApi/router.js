var express = require('express');


var userController = require('./controllers/userController');
var addressController = require('./controllers/addressController');
var itemController = require('./controllers/itemController');
var financeController = require('./controllers/financeController');

module.exports = function () {

    var options = {
        caseSensitive: true
    };

    // Instantiate an isolated express Router instance
    var router = express.Router(options);  
    
    router.get('/getUsers', userController.getListOfUsers);
    router.post('/userLogin', userController.userLogin);
    router.post('/updateUser', userController.updateUser);
    router.post('/getUserById/:id', userController.getUserById);

    router.post('/addAddress', addressController.addAddress);
    router.get('/getListOfAddress', addressController.getListOfAddress);
    router.post('/deleteAddress', addressController.deleteAddress);
    router.post('/editAddress', addressController.editAddress);
    router.post('/getListOfAddressesById/:id', addressController.getListOfAddressesById);

    router.get('/getListPackageTypes', itemController.getListPackageTypes);
    router.get('/getListOfBookings', itemController.getListOfBookings);
    router.post('/getListOfBookingsById/:id', itemController.getListOfBookingsById);

    router.get('/getListOfInvoices', financeController.getListOfInvoice);
    return router;
};


