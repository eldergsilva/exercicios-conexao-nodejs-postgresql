const express = require('express');
const rotas = express.Router();  
const { listarAutores, cadastrarAutor,buscarAutorPorId } = require('./controlador/autor');
const { listarLivros } = require('./controlador/livro');

rotas.get('/autores', listarAutores);
rotas.post('/autores', cadastrarAutor);
rotas.get('/autores/:id', buscarAutorPorId);
rotas.get('/livros', listarLivros);

module.exports = rotas;