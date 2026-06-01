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
        
        const resultado = await pool.query(`
            SELECT 
                autores.id AS autor_id, 
                autores.nome AS autor_nome, 
                autores.idade, 
                livros.id AS livro_id,
                livros.nome AS livro_nome,
                livros.genero,
                livros.editora,
                livros.data_publicacao
            FROM autores
            LEFT JOIN livros ON autores.id = livros.id_autor
            WHERE autores.id = $1;
        `, [id]);

        
        if (resultado.rows.length === 0) {
            return res.status(404).json({ mensagem: "autor não encontrado" });
        }

        const primeiroRegistro = resultado.rows[0];
        
        
        const autorFormatado = {
            id: primeiroRegistro.autor_id,
            nome: primeiroRegistro.autor_nome,
            idade: primeiroRegistro.idade,
            livros: []
        };

        
        resultado.rows.forEach(linha => {
            if (linha.livro_id) {
                autorFormatado.livros.push({
                    id: linha.livro_id, 
                    id: linha.livro_id,
                    nome: linha.livro_nome,
                    genero: linha.genero,
                    editora: linha.editora,
                    
                    data_publicacao: linha.data_publicacao.toISOString().split('T')[0]
                });
            }
        });

        return res.status(200).json(autorFormatado);

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