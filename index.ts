import inquirer from 'inquirer';
import Db from './db/index.js';

const db = new Db();

init();

function init() {
    loadMainPrompts();
}

function loadMainPrompts() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'select',
            message: 'Choose an action:',
            choices: [
                { name: 'View All Employees', value: 'VIEW_EMPLOYEES' },
                { name: 'Exit', value: 'EXIT' }
            ]
        }
    ]).then(answer => {
        switch (answer.select) {
            case 'VIEW_EMPLOYEES':
                viewEmployees();
                break;
            case 'EXIT':
                console.log('Goodbye!');
                process.exit();
        }
    });
}

async function viewEmployees() {
    console.log('\nFetching employees...\n');
    const employees = await db.findAllEmployees();
    console.table(employees);
    loadMainPrompts();
}
