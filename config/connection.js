const mysql = require('mysql2');
const mysqlPromise = require('mysql2-promise')();

require('dotenv').config();


const db = mysql.createConnection({
  host: 'localhost',
  user: process.env.db_user,
  password: process.env.db_password,
  database: process.env.db_name
});


const dbPromise = mysqlPromise.configure({
  host: 'localhost',
  user: process.env.db_user,
  password: process.env.db_password,
  database: process.env.db_name
});



module.exports = { db, dbPromise };