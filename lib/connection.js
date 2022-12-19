const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Langley214?',
  database: 'employee_db'
});

module.exports = connection;