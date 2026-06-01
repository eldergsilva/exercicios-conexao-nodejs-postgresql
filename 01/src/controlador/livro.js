const pool = require('../db');

const listarLivros = async (req, res) => { 
    try {
        const query =`select 
            livros.id as id ,
            livros.nome as nome,
            livros.genero as genero,
            livros.editora as editora,
            livros.data_publicacao as data_publicacao,
            autores.id as autores_id,
            autores.nome as nome_autores,
            autores.idade as autores_idade
            from livros left join  autores on  livros.id_autor = autores.id`
            
            const {rows} = await pool.query(query);

            const  livros = rows.map(livro => {
            const {autores_id, nome_autores, autores_idade, ...dadosLivro} = livro
            return {

                ...dadosLivro,
                autor: {
                    id: autores_id,        
                    nome: nome_autores,
                    idade: autores_idade
                }            
            }
        })  

        return res.status(200).json(livros);
    } catch (erro) {
        console.error(erro);
        return res.status(500).json({ mensagem: 'Erro ao listar livros' });
    }
}

const cadastrarLivro = async (req, res) => {
    const { id } = req.params;  
    const { nome, genero, editora, data_publicacao } = req.body;

    if (!nome) {
        return res.status(400).json({ mensagem: 'O nome do livro é obrigatório' });
    }

    try {
        const { rowCount, rows } = await pool.query('SELECT * FROM autores WHERE id = $1', [id]);

        if (rowCount === 0) {
            return res.status(404).json({ mensagem: 'Autor não existe!' });
        } 

        const autor = rows[0];

        
        const query = `
            INSERT INTO livros (id_autor, nome, genero, editora, data_publicacao) 
            VALUES ($1, $2, $3, $4, $5) 
            RETURNING *
        `;
        
        const livro = await pool.query(query, [autor.id, nome, genero, editora, data_publicacao]);       

        return res.status(201).json(livro.rows[0]);
    } catch (erro) {
        console.error(erro); 
        return res.status(500).json({ mensagem: 'Erro ao cadastrar livro' });
    }
} 

module.exports = {
    listarLivros,   
    cadastrarLivro
}