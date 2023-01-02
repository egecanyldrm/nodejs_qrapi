const express = require('express');
const router = express.Router();

//Controller
const ownerController = require('../controllers/owner')
//JsonWeb Token Middleware
const authJwt = require('../middleware/auth');
const owner = require('../middleware/owner');

//Routes 

//Product Process

router.get('/customers', authJwt, owner, ownerController.getCustomers);

router.post('/get-customer', authJwt, owner, ownerController.getCustomer);

router.post('/update-customer', authJwt, owner, ownerController.updateCustomer);

router.post('/delete-customer', authJwt, owner, ownerController.deleteCustomer);

router.post('/register', authJwt, owner, ownerController.postRegister);


module.exports = router;