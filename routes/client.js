const express = require('express');
const clientController = require('../controllers/clientController');

const api = express.Router();

api.get('/testing', clientController.testing);

module.exports = api;