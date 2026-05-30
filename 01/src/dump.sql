create database biblioteca ;
CREATE TABLE autores (
    id SERIAL PRIMARY KEY,
    nome TEXT NOT NULL,
    idade INTEGER
);

 

CREATE TABLE livros (
    id SERIAL PRIMARY KEY,                    
    nome TEXT NOT NULL,
    genero TEXT,                              
    editora TEXT,
    data_publicacao DATE,                     
    id_autor INTEGER REFERENCES autores(id)   
    );  