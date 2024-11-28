const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const app = express();
const port = 5000;

// Configurar o banco de dados
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'cadastro'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Conectado ao banco de dados MySQL');
});

app.use(bodyParser.urlencoded({ extended: true }));

// Rota para servir o arquivo HTML
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/cadastro', (req, res) => {
    const { nome, email } = req.body;
    const sql = 'INSERT INTO usuarios (nome, email) VALUES (?, ?)';
    db.query(sql, [nome, email], (err, result) => {
        if (err) throw err;
        res.send('Usuário cadastrado com sucesso!');
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
