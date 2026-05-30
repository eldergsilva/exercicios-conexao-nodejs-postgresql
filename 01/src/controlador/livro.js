const pool = require('../db');
const listarLivros = async (req, res) => {      
    const resultado = await pool.query('SELECT * FROM livros');
    return res.status(200).json(resultado.rows);
}
// 4 - Implemente uma tabela chamada `livros` contendo as seguintes características:

// - Um identificador único do livro como chave primaria e auto incremento;
// - O nome (obrigatório)
// - O genero
// - A editora
// - A data de publicação no formato `YYYY-MM-DD`
// - O identificador do autor responsável pelo livro

// 5 - Implemente a funcionalidade de cadastrar um livro para um autor no banco de dados seguindo as especificações abaixo:

// `POST /autor/:id/livro`

// Exemplo de entrada

// ```
// {
// 	"nome": "Backend PHP",
// 	"genero": "Programação",
// 	"editora": "Cubos Academy",
// 	"data_publicacao": "2020-10-18"
// }
const cadastrarLivro = async (req, res) => {
    // CREATE TABLE livros (
    // id SERIAL PRIMARY KEY,                    
    // nome TEXT NOT NULL,
    // genero TEXT,                              
    // editora TEXT,
    // data_publicacao DATE,                     
    // id_autor INTEGER REFERENCES autores(id)   
    // );  

    const { id } = req.params;
    const { nome, genero, editora, data_publicacao } = req.body;

    if (!nome) {
        return res.status(400).json({ mensagem: 'O nome do livro é obrigatório' });
    }       
    try {
        const cadastrar = await pool.query(
            'INSERT INTO livros (nome, genero, editora, data_publicacao, id_autor) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [nome, genero, editora, data_publicacao, id]
        );
        return res.status(201).json(cadastrar.rows[0]);
    } catch (erro) {
        return res.status(500).json({ mensagem: 'Erro ao cadastrar livro' });
    }
}   





module.exports = {
    listarLivros
}




