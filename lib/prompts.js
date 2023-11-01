// initial user choices
const user_choices = [
    {
        type: 'list',
        message: 'What would you like to do?',
        name: 'user_selection',
        choices: [
            'View All Employees', // DONE
            'Add Employee', // incomplete
            'Update Employee Role', // incomplete
            'View All Roles', // DONE
            'Add Role', // incomplete
            'View All Departments', // DONE
            'Add Department', // DONE

            // bonus
            'Update Employee Manager', // incomplete
            'View Employees By Manager', // incomplete
            'View Employees By Department', // incomplete
            'Delete Departments', // incomplete
            'Delete Roles', // incomplete
            'Delete Employees', // incomplete
            'View Total Utilized Budget Of A Department', // incomplete

            'Quit'
        ]
    },
];

const add_dept_prompts = [
    {
        type: 'input',
        message: "Enter the name of the new department:",
        name: 'new_department',
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

const add_role_prompts = [
    {
        type: 'input',
        message: "Enter the title of the new role:",
        name: 'new_role_title',
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
        message: "Enter the salary of the new role:",
        name: 'new_role_salary',
        validate: function (input) {
            return !isNaN(parseInt(input)) ? true : 'Invalid input. Please enter a valid amount for the salary.';
        },
    },
]


const delete_dept_prompts = [
    {
        type: 'input',
        message: "Enter the ID of the department you wish to delete:",
        name: 'deleted_department',
        validate: function (input) {
            const id = parseInt(input);
            if (isNaN(id)) {
              return 'Invalid department ID. Please enter a valid ID.';
            }
            return true;
        },
    },
]

module.exports = { user_choices, add_dept_prompts, add_role_prompts, delete_dept_prompts };