// import packages 
const inquirer = require('inquirer');
const mysql = require('mysql2');

// package for formatted tables
const Table = require('cli-table');
// package for terminal color manipulation
var colors = require('colors');

// text colors
// black
// red
// green
// yellow
// blue
// magenta
// cyan
// white
// gray
// grey

// bright text colors
// brightRed
// brightGreen
// brightYellow
// brightBlue
// brightMagenta
// brightCyan
// brightWhite


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
    console.log(colors.green(`\nSuccessfully connected to database!\n`))
);

// test connection
db.query('SHOW TABLES', (err, results) => {
    if (err) {console.log(`There was an error connecting to the database: `, err)}
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
        console.log(colors.yellow(`\nSelected: ${response.user_selection}`)); // remove later
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
                viewAllRoles();
                break;
            case 'Add Role':
                nonFunctioningChoice();
                break;
            case 'View All Departments':
                viewAllDepartments();
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

// for development, remove later
function nonFunctioningChoice () {
    console.log(colors.red(`Selection not yet functional.\n`))
    begin();
}

function viewAllEmployees() {
    const sql = `SELECT employees.id, 
                        CONCAT(employees.last_name, ', ', employees.first_name) AS name,
                        roles.title AS role, departments.name AS department, roles.salary,
                        CONCAT(managers.first_name, ' ', managers.last_name) AS manager
                 FROM employees
                 LEFT JOIN roles ON employees.role_id = roles.id
                 LEFT JOIN departments ON roles.department_id = departments.id
                 LEFT JOIN employees AS managers ON employees.manager_id = managers.id
                 ORDER BY employees.last_name, employees.first_name`;
    
    db.query(sql, (err, res) => {
        if (err) {
            console.log(`Error with selection: ${err}`)
            return begin();
        } else {
            console.log(colors.gray(`Viewing all employees in order by last name:`))
            // format table
            const employeeTable = new Table({
                head: [colors.magenta('ID'), colors.magenta('Last, First'), colors.magenta('Role'), colors.magenta('Department'), colors.magenta('Salary'), colors.magenta('Manager')],
                colWidths: [5, 20, 20, 20, 15, 20],
            });

            res.forEach(row => {
                employeeTable.push([
                    row.id,
                    row.name, 
                    row.role,
                    row.department,
                    row.salary,
                    row.manager || 'n/a', 
                ]);
            });

            console.log(employeeTable.toString());
        }
        
        begin();
    });
}

function viewAllRoles () {
    const sql = `SELECT roles.id, roles.title
                 FROM roles
                 ORDER BY roles.title`;

    db.query(sql, (err, res) => {
        if (err) {
            console.log(`Error with selection: ${err}`)
            return begin();
        } else {
            console.log(colors.gray(`Viewing all roles:`))
            // format table
            const roleTable = new Table({
                head: [colors.magenta('ID'), colors.magenta('Role Title')],
                colWidths: [5, 20],
            });

            res.forEach(row => {
                roleTable.push([
                    row.id,
                    row.title,  
                ]);
            });

            console.log(roleTable.toString());
        }
        
        begin();
    });
}

function viewAllDepartments () {
    const sql = `SELECT departments.id, departments.name
                 FROM departments
                 ORDER BY departments.name`;

    db.query(sql, (err, res) => {
        if (err) {
            console.log(`Error with selection: ${err}`)
            return begin();
        } else {
            console.log(colors.gray(`Viewing all departments:`))
            // format table
            const departmentTable = new Table({
                head: [colors.magenta('ID'), colors.magenta('Department Name')],
                colWidths: [5, 20],
            });

            res.forEach(row => {
                departmentTable.push([
                    row.id,
                    row.name,  
                ]);
            });

            console.log(departmentTable.toString());
        }
        
        begin();
    });
}




// end connection and quit database
function endConnection () {
    db.end(function(err) {
        if (err) {console.log(`Error ending database connection: ${err}`);} 
        else {console.log(color.red('Database connection ended.'));}
    });
}