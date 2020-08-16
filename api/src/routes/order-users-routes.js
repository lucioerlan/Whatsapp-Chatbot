const express = require('express');
const router = express.Router();

const controllerUsers = require('../controllers/order-details-controller');

router.get('/order-user/:cpf?/:purchase_code?', controllerUsers.orderUsers);

module.exports = router;
