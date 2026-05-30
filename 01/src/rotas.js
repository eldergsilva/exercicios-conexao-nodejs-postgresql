const express = require('express');
const rotas = express.Router();  
const { listarAutores, cadastrarAutor } = require('./controlador/autor');

rotas.get('/autores', listarAutores);
rotas.post('/autores', cadastrarAutor)

module.exports = rotas;