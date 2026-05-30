const pool = require('../db');
const listarLivros = async (req, res) => {      
    const resultado = await pool.query('SELECT * FROM livros');
    return res.status(200).json(resultado.rows);
}

const cadastrarLivro = async (req, res) => {
    const { id } = req.params;
    const { nome, genero, editora, data_publicacao } = req.body;

    if (!nome) {
        return res.status(400).json({ mensagem: 'O nome do livro é obrigatório' });
    }

    try {
        const autor = await pool.query('SELECT * FROM autores WHERE id = $1', [id]);

        if (autor.rows.length === 0) {
            return res.status(404).json({ mensagem: 'Autor não encontrado' });
        }

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
    listarLivros,   
    cadastrarLivro
}




