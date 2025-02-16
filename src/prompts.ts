import inquirer from 'inquirer';

export async function loadMainPrompts() {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: [
                { name: 'View All Employees', value: 'VIEW_EMPLOYEES' },
                { name: 'View Employees By Manager', value: 'VIEW_EMPLOYEES' },
                { name: 'View Employees By Department', value: 'VIEW_EMPLOYEES' },
                { name: 'View All Departments', value: 'VIEW_DEPARTMENTS' },
                { name: 'View All Roles', value: 'VIEW_ROLES' },
                { name: 'Add Employee', value: 'ADD_EMPLOYEE' },
                { name: 'Update Manager', value: 'UPDATE_MANAGER' },
                { name: 'Delete From Database', value: 'DELETE_FROM_DATABASE' },
                { name: 'Exit', value: 'EXIT' }
            ]
        }
    ]);
}
