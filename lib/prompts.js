// package for terminal color manipulation
var colors = require('colors');

// initial user choices
const user_choices = [
    {
        type: 'list',
        message: 'What would you like to do?',
        name: 'user_selection',
        choices: [
            colors.blue('View All Departments'),
            colors.blue('View All Roles'), 
            colors.blue('View All Employees'), 
            colors.cyan('View Employees By Manager'), // further dev - update to utlize two-part prompt: 1st select manager, 2nd select emp to delete from that list
            colors.cyan('View Employees By Department'), // further dev - update to utlize two-part prompt: 1st select manager, 2nd select emp to delete from that list
            colors.brightCyan('View Total Utilized Budget By Department'), 

            colors.yellow('Update Employee Role'), 
            colors.yellow('Update Employee Manager'),

            colors.green('Add Department'),
            colors.green('Add Role'), 
            colors.green('Add Employee'), 
            
            // further dev for all delete functions:
            // in prompt, can return message include the name of the selected department?
            colors.brightMagenta('Delete Departments'), 
            colors.brightMagenta('Delete Roles'), 
            colors.brightMagenta('Delete Employees'), 
            

            colors.red('Quit')
        ]
    },
];

// prompts to add department
const add_dept_prompts = [
    {
        type: 'input',
        message: "Enter the name of the new department:",
        name: 'new_department',
        validate: function (input) {
            return input.length > 0 ? true : 'This field cannot be left blank.';
        },
    },
]

// prompts to add role
const add_role_prompts = [
    {
        type: 'input',
        message: "Enter the title of the new role:",
        name: 'new_role_title',
        validate: function (input) {
            return input.length > 0 ? true : 'This field cannot be left blank.';
        },
    },
    {
        type: 'input',
        message: "Enter the salary of the new role:",
        name: 'new_role_salary',
        validate: function (input) {
            return !isNaN(parseInt(input)) ? true : 'Invalid input. Please enter a valid amount for the salary.';
        },
    },
]

// prompts to add employee
const add_emp_prompts = [
    {
        type: 'input',
        message: "What is the new employee's first name?",
        name: 'new_emp_first',
        validate: function (input) {
            return input.length > 0 ? true : 'This field cannot be left blank.';
        },
        filter: function (input) {
            return input.toLowerCase().replace(/\b\w/g, function (char) {
                return char.toUpperCase();
            });
        },
    },
    {
        type: 'input',
        message: "What is the new employee's last name?",
        name: 'new_emp_last',
        validate: function (input) {
            return input.length > 0 ? true : 'This field cannot be left blank.';
        },
        filter: function (input) {
            return input.toLowerCase().replace(/\b\w/g, function (char) {
                return char.toUpperCase();
            });
        },
    },
]

module.exports = { user_choices, add_dept_prompts, add_role_prompts, add_emp_prompts };