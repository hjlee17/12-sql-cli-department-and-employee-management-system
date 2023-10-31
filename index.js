// package for inquirer prompts
const inquirer = require('inquirer');
// package for formatted tables
const Table = require('cli-table');
// package for terminal color manipulation
var colors = require('colors');

// import functions
const newEmpData = require('./lib/addEmployee.js');
const { user_choices, add_dept_prompts } = require('./lib/prompts');


// connection to database
const { db, dbPromise } = require('./config/connection');

// test connection
db.connect((err) => {
    if (err) {
        console.log(`There was an error connecting to the database: `, err)
    } else {
        console.log(colors.green(`\nSuccessfully connected to database!\n`))
        begin();
    }
});


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
                addEmployee();
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
                addDept();
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
            console.log(colors.gray(`\nViewing all departments:`))
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

async function addDept () {
    try {
        const response = await inquirer.prompt(add_dept_prompts);
        const sql = `INSERT INTO departments (name) VALUES (?)`;
        db.query(sql, [response.new_department], (err, res) => {
            if (err) {
                console.log(colors.red(`Error adding new department: ${err}\n`));
                return begin();
            } else {
                console.log(colors.green(`Department has been added!`))
                viewAllDepartments();
            }
        });
    } catch (err) {
        console.log(colors.red(`${err}\n`));
        begin();
    }
}



// end connection and quit database
function endConnection () {
    db.end(function(err) {
        if (err) {console.log(`Error ending database connection: ${err}`);} 
        else {console.log(colors.red('Database connection ended.'));}
    });
}