const express = require('express');
const router = express.Router();

//Controller
const customerController = require('../controllers/customer')
//MiddleWare
const customerMiddleWare = require('../middleware/customer')

//Customer Home Page Process 
// router.get('/:customerName/:categoryid', customerMiddleWare, customerController.customerCategory)
router.get('/:customerName', customerMiddleWare, customerController.customerHomePage)

module.exports = router;