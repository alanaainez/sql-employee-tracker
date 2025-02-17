"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
const db_1 = __importDefault(require("./db/db"));
const queries = __importStar(require("./db/queries"));
console.log(queries);
const db = new db_1.default();
init();
function init() {
    loadMainPrompts();
}
function loadMainPrompts() {
    inquirer_1.default.prompt([
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
function handleUserChoice(choice) {
    return __awaiter(this, void 0, void 0, function* () {
        switch (choice) {
            case 'VIEW_DEPARTMENTS':
                const departments = yield getAllDepartments();
                console.table(departments.rows);
                break;
            case 'VIEW_ROLES':
                const roles = yield getAllRoles();
                console.table(roles.rows);
                break;
            case 'VIEW_EMPLOYEES':
                const employees = yield getAllEmployees();
                console.table(employees.rows);
                break;
            case 'VIEW_TOTAL_BUDGET':
                const budgetAnswer = yield inquirer_1.default.prompt([
                    { type: 'number', name: 'departmentId', message: 'Enter the department ID to view total budget:' }
                ]);
                const budgetResult = yield db.getUtilizedBudget(budgetAnswer.departmentId);
                console.log(`Total utilized budget for department ID ${budgetAnswer.departmentId}: $${budgetResult.rows[0].total_budget}`);
                break;
            case 'VIEW_EMPLOYEES_BY_MANAGER':
                const managerAnswer = yield inquirer_1.default.prompt([
                    { type: 'number', name: 'managerId', message: 'Enter the manager ID to view employees:' }
                ]);
                const employeesByManager = yield db.getEmployeesByManager(managerAnswer.managerId);
                console.table(employeesByManager.rows);
                break;
            case 'VIEW_EMPLOYEES_BY_DEPARTMENT':
                const departmentAnswer = yield inquirer_1.default.prompt([
                    { type: 'number', name: 'departmentId', message: 'Enter the department ID to view employees:' }
                ]);
                const employeesByDepartment = yield db.getEmployeesByDepartment(departmentAnswer.departmentId);
                console.table(employeesByDepartment.rows);
                break;
            case 'ADD_DEPARTMENT':
                const deptAnswer = yield inquirer_1.default.prompt([
                    { type: 'input', name: 'name', message: 'Enter the new department name:' }
                ]);
                yield queries.addDepartment(deptAnswer.name);
                console.log(`Added department: ${deptAnswer.name}`);
                break;
            case 'ADD_ROLE':
                const roleAnswers = yield inquirer_1.default.prompt([
                    { type: 'input', name: 'title', message: 'Enter the new role title:' },
                    { type: 'number', name: 'salary', message: 'Enter the salary for this role:' },
                    { type: 'number', name: 'departmentId', message: 'Enter the department ID:' }
                ]);
                yield queries.addRole(roleAnswers.title, roleAnswers.salary, roleAnswers.departmentId);
                console.log(`Added role: ${roleAnswers.title}`);
                break;
            case 'ADD_EMPLOYEE':
                const employeeQuestions = [
                    { type: 'input', name: 'firstName', message: 'Enter the employee first name:' },
                    { type: 'input', name: 'lastName', message: 'Enter the employee last name:' },
                    { type: 'number', name: 'roleId', message: 'Enter the role ID:' },
                    { type: 'input', name: 'managerId', message: 'Enter the manager ID (or leave blank):', filter: (input) => input === '' ? null : parseInt(input) }
                ];
                const employeeAnswers = yield inquirer_1.default.prompt(employeeQuestions);
                yield queries.addEmployee(employeeAnswers.firstName, employeeAnswers.lastName, employeeAnswers.roleId, employeeAnswers.managerId);
                console.log(`Added employee: ${employeeAnswers.firstName} ${employeeAnswers.lastName}`);
                break;
            case 'UPDATE_EMPLOYEE':
                const updateAnswers = yield inquirer_1.default.prompt([
                    { type: 'number', name: 'employeeId', message: 'Enter the employee ID to update:' },
                    { type: 'number', name: 'newRoleId', message: 'Enter the new role ID:' }
                ]);
                yield queries.updateEmployeeRole(updateAnswers.employeeId, updateAnswers.newRoleId);
                console.log(`Updated employee ID ${updateAnswers.employeeId} to role ID ${updateAnswers.newRoleId}`);
                break;
            case 'UPDATE_MANAGER':
                const managerAnswers = yield inquirer_1.default.prompt([
                    { type: 'number', name: 'employeeId', message: 'Enter the employee ID to update manager:' },
                    { type: 'number', name: 'newManagerId', message: 'Enter the new manager ID:' }
                ]);
                yield queries.updateEmployeeManager(managerAnswers.employeeId, managerAnswers.newManagerId);
                console.log(`Updated employee ID ${managerAnswers.employeeId} to manager ID ${managerAnswers.newManagerId}`);
                break;
            case 'DELETE_FROM_DATABASE':
                const deleteChoice = yield inquirer_1.default.prompt([
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
                        const { departmentId } = yield inquirer_1.default.prompt([
                            { type: 'number', name: 'departmentId', message: 'Enter the department ID to delete:' }
                        ]);
                        yield queries.deleteDepartment(departmentId);
                        break;
                    case 'DELETE_ROLE':
                        const { roleId } = yield inquirer_1.default.prompt([
                            { type: 'number', name: 'roleId', message: 'Enter the role ID to delete:' }
                        ]);
                        yield queries.deleteRole(roleId);
                        break;
                    case 'DELETE_EMPLOYEE':
                        const { employeeId } = yield inquirer_1.default.prompt([
                            { type: 'number', name: 'employeeId', message: 'Enter the employee ID to delete:' }
                        ]);
                        yield queries.deleteEmployee(employeeId);
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
    });
}
function getAllEmployees() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield queries.getAllEmployees();
    });
}
function getAllDepartments() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield queries.getAllDepartments();
    });
}
function getAllRoles() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield queries.getAllRoles();
    });
}
