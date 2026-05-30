const express = require('express');
const rotas = express.Router();  
const { listarAutores, cadastrarAutor,buscarAutorPorId } = require('./controlador/autor');
const { listarLivros,cadastrarLivro } = require('./controlador/livro');

rotas.get('/autores', listarAutores);
rotas.post('/autores', cadastrarAutor);
rotas.get('/autores/:id', buscarAutorPorId);
rotas.get('/livros', listarLivros);
rotas.post('/autor/:id/livro', cadastrarLivro);

module.exports = rotas;