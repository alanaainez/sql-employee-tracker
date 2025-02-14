"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllDepartments = getAllDepartments;
exports.getAllRoles = getAllRoles;
exports.getAllEmployees = getAllEmployees;
exports.addDepartment = addDepartment;
exports.addRole = addRole;
exports.addEmployee = addEmployee;
exports.updateEmployeeRole = updateEmployeeRole;
const connection_js_1 = require("./connection.js");
// Get all departments
function getAllDepartments() {
    return __awaiter(this, void 0, void 0, function* () {
        return connection_js_1.pool.query('SELECT * FROM departments;');
    });
}
// Get all roles
function getAllRoles() {
    return __awaiter(this, void 0, void 0, function* () {
        return connection_js_1.pool.query(`
        SELECT roles.id, roles.title, departments.department_name, roles.salary 
        FROM roles
        JOIN departments ON roles.department_id = departments.id;
    `);
    });
}
// Get all employees
function getAllEmployees() {
    return __awaiter(this, void 0, void 0, function* () {
        return connection_js_1.pool.query(`
        SELECT employees.id, employees.first_name, employees.last_name, roles.title AS job_title,
               departments.department_name AS department, roles.salary, 
               COALESCE(manager.first_name || ' ' || manager.last_name, 'None') AS manager
        FROM employees
        JOIN roles ON employees.role_id = roles.id
        JOIN departments ON roles.department_id = departments.id
        LEFT JOIN employees AS manager ON employees.manager_id = manager.id;
    `);
    });
}
// Add a new department
function addDepartment(name) {
    return __awaiter(this, void 0, void 0, function* () {
        return connection_js_1.pool.query('INSERT INTO departments (department_name) VALUES ($1);', [name]);
    });
}
// Add a new role
function addRole(title, salary, departmentId) {
    return __awaiter(this, void 0, void 0, function* () {
        return connection_js_1.pool.query('INSERT INTO roles (title, salary, department_id) VALUES ($1, $2, $3);', [title, salary, departmentId]);
    });
}
// Add a new employee
function addEmployee(firstName, lastName, roleId, managerId) {
    return __awaiter(this, void 0, void 0, function* () {
        return connection_js_1.pool.query('INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4);', [firstName, lastName, roleId, managerId]);
    });
}
// Update an employee's role
function updateEmployeeRole(employeeId, newRoleId) {
    return __awaiter(this, void 0, void 0, function* () {
        return connection_js_1.pool.query('UPDATE employees SET role_id = $1 WHERE id = $2;', [newRoleId, employeeId]);
    });
}
