const express = require('express');
const router = express.Router();

const controllerUsers = require('../controllers/users-controller');

router.get('/user/:cpf?', controllerUsers.allUsers);

module.exports = router;
