const express = require('express');
const app = express();
const port = 3000;

const config = {
    host: 'db_container',
    user: 'root',
    password: 'root',
    database: 'app_db'
};

const mysql = require('mysql2');
const connection = mysql.createConnection(config);

const sql = `INSERT INTO Usuario(nome, email) values('André Guilherme', 'agsoliveira.dev@gmail.com')`;

connection.query(sql);

app.get('/', (req, res) => {
  const sqlSelect = `SELECT * FROM Usuario`;

  connection.query(sqlSelect, (err, results) => {
    if (err) {
      res.status(500).send('Erro ao buscar usuários');
      return;
    }

    const users = results.map(user =>
      `<li>${user.nome} - ${user.email}</li>`
    ).join('');

    res.send(`<h1>Full Cycle Rocks!</h1><h3>Lista de Usuários</h3><ul>${users}</ul>`);
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
