const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const mysql = require('mysql');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

const db = mysql.createConnection({
    host: '167.234.252.168',
    port: 3306,
    user: 'hackathon',
    password: 'hackathon2024',
    database: 'HACKATHON'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to MySQL!');
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'register.html'));
});

app.get('/users', (req, res) => {
    const query = 'SELECT * FROM TB_USERS_SIGNUP';
    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Erro ao buscar os dados dos usuários!');
        }
        res.json(results);
    });
});

app.post('/register', (req, res) => {
    console.log('Register endpoint hit'); 
    const { nome, cpf, rg, email, idade, telefone, senha } = req.body;
    const hashedPassword = bcrypt.hashSync(senha, 10);
    const query = 'INSERT INTO TB_USERS_SIGNUP (NOME, CPF, RG, EMAIL, IDADE, TELEFONE, SENHA) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [nome, cpf, rg, email, idade, telefone, hashedPassword], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Erro ao inserir os dados do usuário!');
        }
        res.send('Data inserted successfully!');
    });
});

app.post('/login', (req, res) => {
    const { email, senha } = req.body;
    const query = 'SELECT * FROM TB_USERS_SIGNUP WHERE EMAIL = ?';

    db.query(query, [email], (err, results) => {
        if (err) {
            return res.status(500).send('Erro no servidor!');
        }
        if (results.length === 0) {
            return res.status(401).send('Email ou senha inválidos!');
        }

        const user = results[0];
        const isPasswordValid = bcrypt.compareSync(senha, user.senha);

        if (!isPasswordValid) {
            return res.status(401).send('Email ou senha inválidos!');
        }
        res.send('Login realizado com sucesso!');
    });
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000!');
});

