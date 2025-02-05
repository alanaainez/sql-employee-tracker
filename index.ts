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
            message: '',
            choices: [
                {
                name: 'View All Employees',
                value: 'VIEW_EMPLOYEES',
                },
            ]
        }
    ])
}