'use strict'

var express = require('express');
var MesasController = require('../controller/mesasController');

var api = express.Router();

var mdAutenticacion = require('../middelware/autenticacion');


api.post('/crear',mdAutenticacion.verificaToken, MesasController.saveMesa);
api.get('/mesa/:id',  MesasController.getMesa);
api.get('/mesas/',  MesasController.getMesas);
api.put('/update-mesas/:id',mdAutenticacion.verificaToken, MesasController.updateMesa);
api.delete('/delete-mesa/:id',mdAutenticacion.verificaToken, MesasController.deleteMesa);


module.exports = api;   