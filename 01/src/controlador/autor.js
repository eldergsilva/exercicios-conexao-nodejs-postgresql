const pool = require('../db');

const listarAutores = async (req, res) => {
    const resultado = await pool.query('SELECT * FROM autores');
    return res.status(200).json(resultado.rows);
}

const cadastrarAutor = async (req, res) => {      
    const { nome, idade } = req.body; 
    if (!nome || !idade) {
        return res.status(400).json({ mensagem: 'Nome e idade são obrigatórios' });
    }     
    try {
    const cadastrar = await pool.query('INSERT INTO autores (nome, idade) VALUES ($1, $2)', [nome, idade]);
     return res.status(201).json(cadastrar.rows[0]);

    } catch (erro) {
     return res.status(500).json({ mensagem: 'Erro ao cadastrar autor' });   
    }
}
const buscarAutorPorId = async (req, res) => {
    const { id } = req.params;
    try {
    const resultado = await pool.query('SELECT * FROM autores WHERE id = $1', [id]);
    if (resultado.rows.length === 0) {
        return res.status(404).json({ mensagem: 'Autor não encontrado' });
    }
    } catch (erro) {
     return res.status(500).json({ mensagem: 'Erro ao buscar autor' });   
    }
    return res.status(200).json(resultado.rows[0]);
}   

module.exports = {
    listarAutores,
    cadastrarAutor,
    buscarAutorPorId
}