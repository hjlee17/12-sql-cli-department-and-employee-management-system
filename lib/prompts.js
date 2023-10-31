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

module.exports = { user_choices, add_dept_prompts };