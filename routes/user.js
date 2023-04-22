const express = require('express');
const userController = require('../controllers/userController');
const auth = require('../middlewares/authenticated');

const api = express.Router();

api.post('/user',auth.decodeToken, userController.addUserAdmin);
api.get('/user',auth.decodeToken, userController.getAllUsers);
api.get('/user/:id', auth.decodeToken, userController.getUserById);
api.delete('/user/:id', auth.decodeToken, userController.deleteUser);
api.put('/user/:id', auth.decodeToken, userController.updateUser);
api.post('/user/signin', userController.signin);

module.exports = api;
