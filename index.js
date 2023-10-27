// import packages 
const inquirer = require('inquirer');
const mysql = require('mysql2');

// env file
require('dotenv').config();

// connection to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      user: process.env.db_user,
      password: process.env.db_password,
      database: process.env.db_name
    },
    console.log(`Connected to the database.`)
);

// test connection
db.query('SHOW TABLES', (err, results) => {
    if (err) {console.log(`There was an error connecting to the database: `, err)}
    console.log(`Successfully connected to database! The following tables are present: `, results)
});


