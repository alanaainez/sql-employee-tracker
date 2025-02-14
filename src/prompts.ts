import inquirer from 'inquirer';

export async function loadMainPrompts() {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: [
                { name: 'View All Employees', value: 'VIEW_EMPLOYEES' },
                { name: 'View All Departments', value: 'VIEW_DEPARTMENTS' },
                { name: 'View All Roles', value: 'VIEW_ROLES' },
                { name: 'Add Employee', value: 'ADD_EMPLOYEE' },
                { name: 'Exit', value: 'EXIT' }
            ]
        }
    ]);
}
