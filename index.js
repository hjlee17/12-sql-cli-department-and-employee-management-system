// package for inquirer prompts
const inquirer = require('inquirer');
// package for formatted tables
var easyTable = require('easy-table')
// package for terminal color manipulation
var colors = require('colors');

// import functions
const { user_choices, add_dept_prompts, add_role_prompts, add_emp_prompts, delete_dept_prompts } = require('./lib/prompts');

// connection to database
const db = require('./config/connection');


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
            case colors.blue('View All Departments'):
                viewAllDepartments();
                break;
            case colors.blue('View All Roles'):
                viewAllRoles();
                break;
            case colors.blue('View All Employees'):
                viewAllEmployees();
                break;
            case colors.cyan('View Employees By Manager'):
                viewAllEmpsByManager();
                break;
            case colors.cyan('View Employees By Department'):
                viewAllEmpsByDepartment();
                break;
                 
            case colors.yellow('Update Employee Role'):
                updateEmpRole();
                break;
            case colors.yellow('Update Employee Manager'):
                updateEmpManager();
                break;
            
            case colors.green('Add Department'):
                addDept();
                break;
            case colors.green('Add Role'):
                addRole();
                break;
            case colors.green('Add Employee'):
                addEmployee();
                break;
                       
            case colors.gray('Delete Departments'):
                deleteDept();
                break;
            case colors.brightMagenta('Delete Roles'):
                deleteRoles();
                break;
            case colors.brightMagenta('Delete Employees'):
                deleteEmps();
                break;
            case colors.gray('View Total Utilized Budget Of A Department'):
                nonFunctioningChoice();
                break;

            case colors.red('Quit'):
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

// ---------------------------------------------------------------------------------------
// VIEW ALL FUNCTIONS //
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
            console.log(colors.red(`Error with selection.\n${err}`))
            return begin();
        } else {
            console.log(colors.gray(`Viewing all employees in order by last name:`))
            // format table with easy-table
            const employeeTable = new easyTable();

            res.forEach(function(row) {
                employeeTable.cell(colors.magenta('ID'), row.id);
                employeeTable.cell(colors.magenta('Last, First'), row.name);
                employeeTable.cell(colors.magenta('Role'), row.role);
                employeeTable.cell(colors.magenta('Department'), row.department);
                employeeTable.cell(colors.magenta('Salary, USD'), row.salary);
                employeeTable.cell(colors.magenta('Manager'), row.manager || 'n/a');
                employeeTable.newRow();
            });

            // print table
            console.log(employeeTable.toString());
        }
        
        begin();
    });
}

function viewAllEmpsByManager() {
    const sql = `SELECT employees.id, 
                        CONCAT(employees.last_name, ', ', employees.first_name) AS name,
                        roles.title AS role, departments.name AS department, roles.salary,
                        CONCAT(managers.first_name, ' ', managers.last_name) AS manager
                 FROM employees
                 LEFT JOIN roles ON employees.role_id = roles.id
                 LEFT JOIN departments ON roles.department_id = departments.id
                 LEFT JOIN employees AS managers ON employees.manager_id = managers.id
                 ORDER BY managers.last_name, managers.first_name`;
    
    db.query(sql, (err, res) => {
        if (err) {
            console.log(colors.red(`Error with selection.\n${err}`))
            return begin();
        } else {
            console.log(colors.gray(`Viewing all employees in order by last name:`))
            // format table with easy-table
            const employeeTable = new easyTable();

            res.forEach(function(row) {
                employeeTable.cell(colors.magenta('Manager'), row.manager || 'n/a');
                employeeTable.cell(colors.magenta('ID'), row.id);
                employeeTable.cell(colors.magenta('Last, First'), row.name);
                employeeTable.cell(colors.magenta('Role'), row.role);
                employeeTable.cell(colors.magenta('Department'), row.department);
                employeeTable.cell(colors.magenta('Salary, USD'), row.salary);
                employeeTable.newRow();
            });

            // print table
            console.log(employeeTable.toString());
        }
        
        begin();
    });
}

function viewAllEmpsByDepartment() {
    const sql = `SELECT employees.id, 
                        CONCAT(employees.last_name, ', ', employees.first_name) AS name,
                        roles.title AS role, departments.name AS department, roles.salary,
                        CONCAT(managers.first_name, ' ', managers.last_name) AS manager
                 FROM employees
                 LEFT JOIN roles ON employees.role_id = roles.id
                 LEFT JOIN departments ON roles.department_id = departments.id
                 LEFT JOIN employees AS managers ON employees.manager_id = managers.id
                 ORDER BY departments.name`;
    
    db.query(sql, (err, res) => {
        if (err) {
            console.log(colors.red(`Error with selection.\n${err}`))
            return begin();
        } else {
            console.log(colors.gray(`Viewing all employees in order by last name:`))
            // format table with easy-table
            const employeeTable = new easyTable();

            res.forEach(function(row) {
                employeeTable.cell(colors.magenta('Department'), row.department);
                employeeTable.cell(colors.magenta('ID'), row.id);
                employeeTable.cell(colors.magenta('Last, First'), row.name);
                employeeTable.cell(colors.magenta('Role'), row.role);
                employeeTable.cell(colors.magenta('Salary, USD'), row.salary);
                employeeTable.cell(colors.magenta('Manager'), row.manager || 'n/a');
                employeeTable.newRow();
            });

            // print table
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
            console.log(colors.red(`Error with selection.\n${err}`))
            return begin();
        } else {
            console.log(colors.gray(`Viewing all roles by title:`))
            // format table with easy-table
            const roleTable = new easyTable();

            res.forEach(function(row) {
                roleTable.cell(colors.magenta('ID'), row.id);
                roleTable.cell(colors.magenta('Role Title'), row.title);
                roleTable.newRow();
            });

            // print table
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
            console.log(colors.red(`Error with selection.\n${err}`))
            return begin();
        } else {
            console.log(colors.gray(`Viewing all departments by name:`))
            // format table with easy-table
            const departmentTable = new easyTable();

            res.forEach(function(row) {
                departmentTable.cell(colors.magenta('ID'), row.id);
                departmentTable.cell(colors.magenta('Department Name'), row.name);
                departmentTable.newRow();
            });

            // print table
            console.log(departmentTable.toString());
        }
        
        begin();
    });
}


// ---------------------------------------------------------------------------------------
// ADD FUNCTIONS
async function addDept () {
    try {
        // collect user info regarding new dept name
        const response = await inquirer.prompt(add_dept_prompts);
        let newDeptName = response.new_department;

        // query departments from database
        const sql = `INSERT INTO departments (name) VALUES (?)`;
        db.query(sql, [newDeptName], (err, res) => {
            if (err) {
                console.log(colors.red(`Error adding new department.\n${err}`));
                return begin();
            } else {
                console.log(colors.green(`Department has been added! See updated list below:`))
                viewAllDepartments();
            }
        });
    } catch (err) {
        console.log(colors.red(`${err}\n`));
        begin();
    }
}

async function addRole () {
    try {
        // collect user info regarding new role name and salary
        const response = await inquirer.prompt(add_role_prompts);
        let newRoleTitle = response.new_role_title; 
        let newRoleSalary = response.new_role_salary;
        
        // query departments from database
        const sql = `SELECT departments.id, departments.name
                        FROM departments
                        ORDER BY departments.name`;
        db.promise().query(sql)
        .then(([result]) => {
            // using result, form array with list of department choices
            const deptChoices = result.map(( { id, name } ) => ( {
                name: name,
                value: id,
            }
            ));
            
            // user prompt to collect info regarding new role dept
            inquirer.prompt([
                {
                    type: 'list',
                    message: "Select the department for the new role:",
                    name: 'new_role_department',
                    choices: deptChoices
                }
            ])
            .then((response) => {
                let newRoleDpt = response.new_role_department
                const sql = `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`;
                // insert new role into the database
                db.query(sql, [newRoleTitle, newRoleSalary, newRoleDpt], (err, res) => {
                    // error handling
                    if (err) {
                        console.log(colors.red(`Error adding new role: ${err}\n`));
                        return begin();
                    // success log message and display all roles to show new role included
                    } else {
                        console.log(colors.green(`New role has been added: ${newRoleTitle}. See updated list below:`))
                        viewAllRoles();
                    }
                });
            })
        })

    } catch (err) {
        console.log(colors.red(`${err}\n`));
        begin();
    }
}

async function addEmployee () {
    try {
        // collect user info regarding new role name and salary
        const response = await inquirer.prompt(add_emp_prompts);
        let newEmpFirst = response.new_emp_first; 
        let newEmpLast = response.new_emp_last;
        
        // query departments from database
        const sql = `SELECT roles.id, roles.title
                     FROM roles ORDER BY roles.title`;

        db.promise().query(sql)
        .then(([result]) => {
            // using result, form array with list of roles
            const roleChoices = result.map(( { id, title } ) => 
                ({
                    name: title,
                    value: id,
                })
            );
       
            // user prompt to collect info regarding new emp's role
            inquirer.prompt([
                {
                    type: 'list',
                    message: "Select the role for the new employee:",
                    name: 'new_emp_role',
                    choices: roleChoices
                }
            ])
            .then((response) => {
                let newEmpRole = response.new_emp_role;

                const sql = `SELECT employees.id, 
                             CONCAT(employees.last_name, ', ', employees.first_name, ' [ID: ', employees.id, ']') AS name
                             FROM employees ORDER BY employees.last_name`;

                db.promise().query(sql)
                .then(([result]) => {
                    // using result, form array with list of role choices
                    const managerChoices = result.map(( { id, name } ) => 
                        ({
                            name: name,
                            value: id,
                        })
                    );
                    // push an empty string into the array to provide a "null" choice in the prompt
                    managerChoices.push({
                        name: 'None',
                        value: null,
                    });
                    
                    inquirer.prompt([
                        {
                            type: 'list',
                            message: "Select the manager of the new employee:",
                            name: 'new_emp_manager',
                            choices: managerChoices
                        }
                    ])
                    .then((response) => {
                        let newEmpManager = response.new_emp_manager;
                        const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) 
                                     VALUES (?, ?, ?, ?)`;
                        
                        // insert new employee into the database
                        db.query(sql, [newEmpFirst, newEmpLast, newEmpRole, newEmpManager], (err, res) => {
                            // error handling
                            if (err) {
                                console.log(colors.red(`Error adding new employee.\n${err}`));
                                return begin();
                            // success log message and display all employees to show new employee included
                            } else {
                                console.log(colors.green(`New role has been added: ${newEmpFirst} ${newEmpLast}. See updated list below:`))
                                viewAllEmployees();
                            }
                        });
                    })
                })
            })
        })

    } catch (err) {
        console.log(colors.red(`${err}\n`));
        begin();
    }
}


// ---------------------------------------------------------------------------------------
// UPDATE FUNCTIONS
async function updateEmpRole () {
    try {        
        // query departments from database
        const sql = `SELECT employees.id, 
                        CONCAT(employees.last_name, ', ', employees.first_name, 
                            ' [Role: ', roles.title, ']', ' [ID: ', employees.id, ']') AS name
                        FROM employees
                        INNER JOIN roles ON employees.role_id = roles.id
                        ORDER BY employees.last_name`;

        db.promise().query(sql)
        .then(([result]) => {
            // using result, form array with list of employees
            const employeeChoices = result.map(( { id, name } ) => 
                ({
                    name: name,
                    value: id,
                })
            );
       
            // user prompt to collect info regarding emp to update
            inquirer.prompt([
                {
                    type: 'list',
                    message: "Select the employee to update role:",
                    name: 'emp_to_update',
                    choices: employeeChoices
                }
            ])
            .then((response) => {
                let updatedEmp = response.emp_to_update;

                // query to select roles
                const sql = `SELECT roles.id, roles.title
                             FROM roles ORDER BY roles.title`;

                db.promise().query(sql)
                .then(([result]) => {
                    const roleChoices = result.map(( { id, title } ) => 
                        ({
                            name: title,
                            value: id,
                        })
                    ); 
                    // user prompt to collect info regarding emp's new role
                    inquirer.prompt([
                        {
                            type: 'list',
                            message: "Select the new role for the employee:",
                            name: 'updated_emp_role',
                            choices: roleChoices
                        }
                    ])
                    .then((response) => {
                        let updatedEmpRole = response.updated_emp_role;

                        // query to update role
                        const sql = `UPDATE employees SET role_id = ? WHERE id = ?`;
                        db.query(sql, [updatedEmp, updatedEmpRole], (err, res) => {
                            // error handling
                            if (err) {
                                console.log(colors.red(`Error updating employee.\n${err}`));
                                return begin();
                            // success log message and display all employees to show new employee included
                            } else {
                                console.log(colors.green(`Role has been updated. See updates below:`))
                                viewAllEmployees();
                            }
                        })
                    })
                })
            })
        })

    } catch (err) {
        console.log(colors.red(`${err}\n`));
        begin();
    }
}

async function updateEmpManager () {
    try {        
        // query selects employees who have managers 
        // includes their name, ID, and name of manager
        const sql = `SELECT employees.id,
                     CONCAT(
                        employees.last_name, ', ', employees.first_name,
                        ' [ID: ', employees.id, ']',
                        ' [Manager: ',
                        (SELECT CONCAT(manager.first_name, ' ', manager.last_name) 
                        FROM employees AS manager 
                        WHERE manager.id = employees.manager_id),
                        ']'
                    ) AS name
                     FROM employees
                     INNER JOIN roles ON employees.role_id = roles.id
                     WHERE employees.manager_id IS NOT NULL
                     ORDER BY employees.last_name;`

        db.promise().query(sql)
        .then(([result]) => {
            // using result, form array with list of employees
            const employeeChoices = result.map(( { id, name } ) => 
                ({
                    name: name,
                    value: id,
                })
            );
       
            // user prompt to collect info regarding emp to update
            inquirer.prompt([
                {
                    type: 'list',
                    message: "Select the employee to update manager:",
                    name: 'emp_to_update',
                    choices: employeeChoices
                }
            ])
            .then((response) => {
                let updatedEmp = response.emp_to_update;

                // query for list of employees to select manager
                const sql = `SELECT employees.id,
                             CONCAT(employees.last_name, ', ', employees.first_name, ' [ID: ', employees.id, ']') AS name
                             FROM employees
                             ORDER BY employees.last_name;`;

                db.promise().query(sql)
                .then(([result]) => {
                    const managerChoices = result.map(( { id, name } ) => 
                        ({
                            name: name,
                            value: id,
                        })
                    ); 
                    
                    // user prompt to collet info regarding new manager
                    inquirer.prompt([
                        {
                            type: 'list',
                            message: "Select the new manager for the employee:",
                            name: 'updated_emp_manager',
                            choices: managerChoices
                        }
                    ])
                    .then((response) => {
                        let updatedEmpManager = response.updated_emp_manager;

                        // query to update manager
                        const sql = `UPDATE employees SET manager_id = ? WHERE id = ?`;
                        db.query(sql, [updatedEmp, updatedEmpManager], (err, res) => {
                            // error handling
                            if (err) {
                                console.log(colors.red(`Error updating employee's manager.\n${err}`));
                                return begin();
                            // success log message and display all employees to show new employee included
                            } else {
                                console.log(colors.green(`Manager has been updated. See updates below:`))
                                viewAllEmployees();
                            }
                        })
                    })
                })
            })
        })

    } catch (err) {
        console.log(colors.red(`${err}\n`));
        begin();
    }
}

// ---------------------------------------------------------------------------------------
// DELETE FUNCTIONS
async function deleteEmps () {
    try {        
        // query departments from database
        const sql = `SELECT employees.id,
                     CONCAT(employees.last_name, ', ', employees.first_name, ' [ID: ', employees.id, ']') AS name
                     FROM employees
                     ORDER BY employees.last_name;`;

        db.promise().query(sql)
        .then(([result]) => {
            // using result, form array with list of employees
            const employeeChoices = result.map(( { id, name } ) => 
                ({
                    name: name,
                    value: id,
                })
            );
       
            // user prompt to collect info regarding emp to delete
            inquirer.prompt([
                {
                    type: 'list',
                    message: "Select the employee to delete:",
                    name: 'emp_to_delete',
                    choices: employeeChoices
                },
                {
                    type: 'confirm',
                    message: function () {
                        // can return message include the name? how to access name 
                        return colors.red(`Are you sure you want to delete this employee? This cannot be undone!`);
                    },
                    name: 'confirm_delete',
                },
            ])
            .then((response) => {
                let deletedEmp = response.emp_to_delete;

                const sql = `DELETE FROM employees WHERE id = ?`;
                db.query(sql, [deletedEmp], (err, res) => {
                    // error handling
                    if (err) {
                        console.log(colors.red(`Error deleting employee.\n${err}`));
                        return begin();
                    // success log message and display all employees to new employee list
                    } else {
                        console.log(colors.green(`Employee has been deleted. See updated list below:`))
                        viewAllEmployees();
                    }
                })
            })
        })

    } catch (err) {
        console.log(colors.red(`${err}\n`));
        begin();
    }
}

async function deleteRoles () {
    try {        
        // query roles from database
        const sql = `SELECT roles.id, roles.title
                     FROM roles
                     ORDER BY roles.title`;

        db.promise().query(sql)
        .then(([result]) => {
            // using result, form array with list of roles
            const roleChoices = result.map(( { id, title } ) => 
                ({
                    name: title,
                    value: id,
                })
            ); 
            // user prompt to collect info regarding role to delete
            inquirer.prompt([
                {
                    type: 'list',
                    message: "Select the role to delete:",
                    name: 'role_to_delete',
                    choices: roleChoices
                },
                {
                    type: 'confirm',
                    message: function () {
                        // can return message include the name? how to access name?
                        // can there be a table displayed to show which employees will be deleted as a result? 
                        return colors.red(`Are you sure you want to delete this role? This cannot be undone!`);
                    },
                    name: 'confirm_delete',
                },
            ])
            .then((response) => {
                let deletedRole = response.role_to_delete;
                console.log(deletedRole)

                const sql = `DELETE FROM roles WHERE id = ?`;
                db.query(sql, [deletedRole], (err, res) => {
                    // error handling
                    if (err) {
                        console.log(colors.red(`Error deleting role.\n${err}`));
                        return begin();
                    // success log message and display all employees to new employee list
                    } else {
                        console.log(colors.green(`Role has been deleted. See updated list below:`))
                        viewAllRoles();
                    }
                })
            })
        })

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