import inquirer from 'inquirer';
import Db from './db'; 
import { getAllDepartments, getAllRoles, getAllEmployees, addDepartment, addRole, addEmployee, updateEmployeeRole } from './queries.js';

const db = new Db();
init();

function init() {
    loadMainPrompts();
}

function loadMainPrompts() {
    inquirer.prompt([
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
                { name: 'Delete From Database', value: 'DELETE_FROM_DATABASE' },
                { name: 'Exit', value: 'EXIT' }
            ]
        }
    ]).then(answer => {
        handleUserChoice(answer.action);
    });
}

async function handleUserChoice(choice: string) {
    switch (choice) {
        case 'VIEW_DEPARTMENTS':
            const departments = await getAllDepartments();
            console.table(departments.rows);
            break;

        case 'VIEW_ROLES':
            const roles = await getAllRoles();
            console.table(roles.rows);
            break;

        case 'VIEW_EMPLOYEES':
            const employees = await getAllEmployees();
            console.table(employees.rows);
            break;

        case 'ADD_DEPARTMENT':
            const deptAnswer = await inquirer.prompt([
                { type: 'input', name: 'name', message: 'Enter the new department name:' }
            ]);
            await addDepartment(deptAnswer.name);
            console.log(`Added department: ${deptAnswer.name}`);
            break;

        case 'ADD_ROLE':
            const roleAnswers = await inquirer.prompt([
                { type: 'input', name: 'title', message: 'Enter the new role title:' },
                { type: 'number', name: 'salary', message: 'Enter the salary for this role:' },
                { type: 'number', name: 'departmentId', message: 'Enter the department ID:' }
            ]);
            await addRole(roleAnswers.title, roleAnswers.salary, roleAnswers.departmentId);
            console.log(`Added role: ${roleAnswers.title}`);
            break;

        case 'ADD_EMPLOYEE':
            const employeeQuestions: inquirer.Question[] = [
                { type: 'input', name: 'firstName', message: 'Enter the employee first name:' },
                { type: 'input', name: 'lastName', message: 'Enter the employee last name:' },
                { type: 'number', name: 'roleId', message: 'Enter the role ID:' },
                { type: 'number', name: 'managerId', message: 'Enter the manager ID (or leave blank):', default: null }
            ];
            const employeeAnswers = await inquirer.prompt(employeeQuestions);
            await addEmployee(employeeAnswers.firstName, employeeAnswers.lastName, employeeAnswers.roleId, employeeAnswers.managerId);
            console.log(`Added employee: ${employeeAnswers.firstName} ${employeeAnswers.lastName}`);
            break;

        case 'UPDATE_EMPLOYEE':
            const updateAnswers = await inquirer.prompt([
                { type: 'number', name: 'employeeId', message: 'Enter the employee ID to update:' },
                { type: 'number', name: 'newRoleId', message: 'Enter the new role ID:' }
            ]);
            await updateEmployeeRole(updateAnswers.employeeId, updateAnswers.newRoleId);
            console.log(`Updated employee ID ${updateAnswers.employeeId} to role ID ${updateAnswers.newRoleId}`);
            break;

        case 'EXIT':
            console.log('Goodbye!');
            process.exit();
    }

    // Reload prompts after each action
    loadMainPrompts();
}