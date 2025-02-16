import inquirer, { QuestionCollection } from 'inquirer';
import Db from './db/db';
import { getAllDepartments, getAllRoles, getAllEmployees, 
    addDepartment, addRole, addEmployee, updateEmployeeRole, updateEmployeeManager,
    deleteDepartment, deleteRole, deleteEmployee } from './db/queries';

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
                { name: 'View Employees By Manager', value: 'VIEW_EMPLOYEES_BY_MANAGER' },
                { name: 'View Employees By Department', value: 'VIEW_EMPLOYEES_BY_DEPARTMENT' },
                { name: 'View All Departments', value: 'VIEW_DEPARTMENTS' },
                { name: 'View All Roles', value: 'VIEW_ROLES' },
                { name: 'View Total Dept. Budget', value: 'VIEW_TOTAL_BUDGET' },
                { name: 'Add Department', value: 'ADD_DEPARTMENT' },
                { name: 'Add Role', value: 'ADD_ROLE' },
                { name: 'Add Employee', value: 'ADD_EMPLOYEE' },
                { name: 'Update Employee Role', value: 'UPDATE_EMPLOYEE' },
                { name: 'Update Manager', value: 'UPDATE_MANAGER' },
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

        case 'VIEW_TOTAL_BUDGET':
            const budgetAnswer = await inquirer.prompt([
                { type: 'number', name: 'departmentId', message: 'Enter the department ID to view total budget:' }
            ]);
            const budgetResult = await db.getUtilizedBudget(budgetAnswer.departmentId);
            console.log(`Total utilized budget for department ID ${budgetAnswer.departmentId}: $${budgetResult.rows[0].total_budget}`);
            break;

        case 'VIEW_EMPLOYEES_BY_MANAGER':
            const managerAnswer = await inquirer.prompt([
                { type: 'number', name: 'managerId', message: 'Enter the manager ID to view employees:' }
            ]);
            const employeesByManager = await db.getEmployeesByManager(managerAnswer.managerId);
            console.table(employeesByManager.rows);
            break;

        case 'VIEW_EMPLOYEES_BY_DEPARTMENT':
            const departmentAnswer = await inquirer.prompt([
                { type: 'number', name: 'departmentId', message: 'Enter the department ID to view employees:' }
            ]);
            const employeesByDepartment = await db.getEmployeesByDepartment(departmentAnswer.departmentId);
            console.table(employeesByDepartment.rows);
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
            const employeeQuestions: QuestionCollection = [
                { type: 'input', name: 'firstName', message: 'Enter the employee first name:' },
                { type: 'input', name: 'lastName', message: 'Enter the employee last name:' },
                { type: 'number', name: 'roleId', message: 'Enter the role ID:' },
                { type: 'input', name: 'managerId', message: 'Enter the manager ID (or leave blank):', filter: (input) => input === '' ? null : parseInt(input) }
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

        case 'UPDATE_MANAGER':
            const managerAnswers = await inquirer.prompt([
                { type: 'number', name: 'employeeId', message: 'Enter the employee ID to update manager:' },
                { type: 'number', name: 'newManagerId', message: 'Enter the new manager ID:' }
            ]);
            await db.updateEmployeeManager(managerAnswers.employeeId, managerAnswers.newManagerId);
            console.log(`Updated employee ID ${managerAnswers.employeeId} to manager ID ${managerAnswers.newManagerId}`);
            break;

        case 'DELETE_FROM_DATABASE':
            const deleteChoice = await inquirer.prompt([
                { 
                  type: 'list', 
                  name: 'deleteOption', 
                  message: 'What would you like to delete?', 
                  choices: [
                        { name: 'Department', value: 'DELETE_DEPARTMENT' },
                        { name: 'Role', value: 'DELETE_ROLE' },
                        { name: 'Employee', value: 'DELETE_EMPLOYEE' },
                        { name: 'Exit', value: 'EXIT' }
                        ]
                    }
                ]);
            
                switch (deleteChoice.deleteOption) {
                    case 'DELETE_DEPARTMENT':
                        const { departmentId } = await inquirer.prompt([
                            { type: 'number', name: 'departmentId', message: 'Enter the department ID to delete:' }
                        ]);
                        await deleteDepartment(departmentId);
                        break;
            
                    case 'DELETE_ROLE':
                        const { roleId } = await inquirer.prompt([
                            { type: 'number', name: 'roleId', message: 'Enter the role ID to delete:' }
                        ]);
                        await deleteRole(roleId);
                        break;
            
                    case 'DELETE_EMPLOYEE':
                        const { employeeId } = await inquirer.prompt([
                            { type: 'number', name: 'employeeId', message: 'Enter the employee ID to delete:' }
                        ]);
                        await deleteEmployee(employeeId);
                        break;
                    case 'EXIT':
                        console.log('Exiting delete menu.');
                        break;
                }
                break;     

        case 'EXIT':
            console.log('Goodbye!');
            process.exit();
    }

    // Reload prompts after each action
    loadMainPrompts();
}
