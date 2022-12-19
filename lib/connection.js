const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Langley214?',
  database: 'cms_database'
});

module.exports = connection;