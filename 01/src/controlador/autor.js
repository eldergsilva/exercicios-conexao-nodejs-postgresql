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
    const cadastrar = await pool.query('INSERT INTO autores (nome, idade) VALUES ($1, $2) returning *', [nome, idade]);
     return res.status(201).json(cadastrar.rows[0]);

    } catch (erro) {
     return res.status(500).json({ mensagem: 'Erro ao cadastrar autor' });   
    }
}
const buscarAutorPorId = async (req, res) => {
    const { id } = req.params;
    try {
        
        const query = `
            SELECT 
                autores.id AS id, 
                autores.nome AS nome, 
                autores.idade, 
                livros.id AS livro_id,
                livros.nome AS livro_nome,
                livros.genero,
                livros.editora,
                livros.data_publicacao
            FROM autores
            LEFT JOIN livros ON autores.id = livros.id_autor
            WHERE autores.id = $1;
        `;

        const {rowCount, rows} = await pool.query(query,[id]);

        if (rowCount === 0) {
            return res.status(404).json({ mensagem: "autor não encontrado" });
        }              
        
        const livros = rows.map(livro => {
           return {
            id: livro.livro_id,
            nome: livro.livro_nome,
            genero: livro.genero,
            editora: livro.editora,
            data_publicacao: livro.data_publicacao.toISOString().split('T')[0]
           }
        });

        const autor = {
            id:rows[0].id,
            nome: rows[0].nome,
            idade: rows[0].idade,
            livros
        };

        return res.status(200).json(autor);

    } catch (erro) {
        console.error(erro);
        return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
}   

module.exports = {
    listarAutores,
    cadastrarAutor,
    buscarAutorPorId
}