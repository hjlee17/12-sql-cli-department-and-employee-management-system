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

module.exports = { user_choices };