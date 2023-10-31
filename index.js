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
    console.log(`Successfully connected to database!`)
    begin();
});


// initial user choices
const user_choices = [
    {
        type: 'list',
        message: 'What would you like to do?',
        name: 'user_selection',
        choices: [
            'View All Employees', 
            'Add Employee',
            'Update Employee Role', 
            'View All Roles',
            'Add Role',
            'View All Departments',
            'Add Department',
            // bonus
            'Update Employee Manager',
            'View Employees By Manager',
            'View Employees By Department',
            'Delete Departments',
            'Delete Roles',
            'Delete Employees',
            'View Total Utilized Budget Of A Department',
            'Quit'
        ]
    },
];

// function to display choices for user selection
function begin() {
    inquirer.prompt(user_choices)
    .then(response => {
        console.log(`Selected: ${response.user_selection}`); // remove later
        switch (response.user_selection) {
            case 'View All Employees':
                viewAllEmployees();
                break;
            case 'Add Employee':
                nonFunctioningChoice();
                break;
            case 'Update Employee Role':
                nonFunctioningChoice();
                break;
            case 'View All Roles':
                nonFunctioningChoice();
                break;
            case 'Add Role':
                nonFunctioningChoice();
                break;
            case 'View All Departments':
                nonFunctioningChoice();
                break;
            case 'Add Department':
                nonFunctioningChoice();
                break;
            
            // bonus
            case 'Update Employee Manager':
                nonFunctioningChoice();
                break;
            case 'Update Employee Manager':
                nonFunctioningChoice();
                break;
            case 'View Employees By Manager':
                nonFunctioningChoice();
                break;
            case 'View Employees By Department':
                nonFunctioningChoice();
                break;
            case 'Delete Departments':
                nonFunctioningChoice();
                break;
            case 'Delete Roles':
                nonFunctioningChoice();
                break;
            case 'Delete Employees':
                nonFunctioningChoice();
                break;
            case 'View Total Utilized Budget Of A Department':
                nonFunctioningChoice();
                break;

            case 'Quit':
                endConnection();
                break;

        }
    });
}


function endConnection () {
    db.end(function(err) {
        if (err) {console.log(`Error ending database connection: ${err}`);} 
        else {console.log('Database connection ended.');}
    });
}