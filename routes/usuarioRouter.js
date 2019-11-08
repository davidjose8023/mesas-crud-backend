'use strict'

var express = require('express');
var UserController = require('../controller/usuarioController');

var api = express.Router();
var mdAutenticacion = require('../middelware/autenticacion');


api.post('/register', UserController.saveUser);
api.post('/login', UserController.loginUser);
api.get('/user/:id',  UserController.getUser);
api.get('/users/',  UserController.getUsers);
api.put('/update-user/:id', UserController.updateUser);
api.delete('/delete-user/:id', UserController.deleteUser);
api.get('/renuevatoken',mdAutenticacion.verificaToken, UserController.renuevaToken);
api.get('/',  UserController.prueba);


module.exports = api;   