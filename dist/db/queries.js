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
exports.deleteDepartment = exports.deleteRole = exports.deleteEmployee = exports.updateEmployeeManager = exports.updateEmployeeRole = exports.addEmployee = exports.addRole = exports.addDepartment = exports.getUtilizedBudget = exports.getEmployeesByDepartment = exports.getEmployeesByManager = exports.getAllEmployees = exports.getAllRoles = exports.getAllDepartments = void 0;
const connection_js_1 = require("../db/connection.js");
// Get all departments
function getAllDepartments() {
    return __awaiter(this, void 0, void 0, function* () {
        return connection_js_1.pool.query('SELECT * FROM departments;');
    });
}
exports.getAllDepartments = getAllDepartments;
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
exports.getAllRoles = getAllRoles;
// Get all employees
function getAllEmployees() {
    return __awaiter(this, void 0, void 0, function* () {
        return connection_js_1.pool.query(`
        SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.department_name, employees.manager_id 
        FROM employees
        JOIN roles ON employees.role_id = roles.id
        JOIN departments ON roles.department_id = departments.id;
    `);
    });
}
exports.getAllEmployees = getAllEmployees;
// Get employees by manager
function getEmployeesByManager(managerId) {
    return __awaiter(this, void 0, void 0, function* () {
        return connection_js_1.pool.query('SELECT * FROM employees WHERE manager_id = $1;', [managerId]);
    });
}
exports.getEmployeesByManager = getEmployeesByManager;
// Get employees by department
function getEmployeesByDepartment(departmentId) {
    return __awaiter(this, void 0, void 0, function* () {
        return connection_js_1.pool.query(`
        SELECT employees.id, employees.first_name, employees.last_name, roles.title 
        FROM employees
        JOIN roles ON employees.role_id = roles.id
        WHERE roles.department_id = $1;
    `, [departmentId]);
    });
}
exports.getEmployeesByDepartment = getEmployeesByDepartment;
// Get total utilized budget of a department
function getUtilizedBudget(departmentId) {
    return __awaiter(this, void 0, void 0, function* () {
        return connection_js_1.pool.query(`
        SELECT SUM(roles.salary) AS total_budget
        FROM employees
        JOIN roles ON employees.role_id = roles.id
        WHERE roles.department_id = $1;
    `, [departmentId]);
    });
}
exports.getUtilizedBudget = getUtilizedBudget;
// Add a new department
function addDepartment(name) {
    return __awaiter(this, void 0, void 0, function* () {
        return connection_js_1.pool.query('INSERT INTO departments (department_name) VALUES ($1);', [name]);
    });
}
exports.addDepartment = addDepartment;
// Add a new role
function addRole(title, salary, departmentId) {
    return __awaiter(this, void 0, void 0, function* () {
        return connection_js_1.pool.query('INSERT INTO roles (title, salary, department_id) VALUES ($1, $2, $3);', [title, salary, departmentId]);
    });
}
exports.addRole = addRole;
// Add a new employee
function addEmployee(firstName, lastName, roleId, managerId) {
    return __awaiter(this, void 0, void 0, function* () {
        return connection_js_1.pool.query('INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4);', [firstName, lastName, roleId, managerId]);
    });
}
exports.addEmployee = addEmployee;
// Update an employee's role
function updateEmployeeRole(employeeId, newRoleId) {
    return __awaiter(this, void 0, void 0, function* () {
        return connection_js_1.pool.query('UPDATE employees SET role_id = $1 WHERE id = $2;', [newRoleId, employeeId]);
    });
}
exports.updateEmployeeRole = updateEmployeeRole;
// Update an employee's manager
function updateEmployeeManager(employeeId, newManagerId) {
    return __awaiter(this, void 0, void 0, function* () {
        return connection_js_1.pool.query('UPDATE employees SET manager_id = $1 WHERE id = $2;', [newManagerId, employeeId]);
    });
}
exports.updateEmployeeManager = updateEmployeeManager;
// Delete an employee
function deleteEmployee(employeeId) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = `DELETE FROM employees WHERE id = $1`;
        yield connection_js_1.pool.query(query, [employeeId]);
    });
}
exports.deleteEmployee = deleteEmployee;
// Delete a role
function deleteRole(roleId) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = `DELETE FROM roles WHERE id = $1`;
        yield connection_js_1.pool.query(query, [roleId]);
    });
}
exports.deleteRole = deleteRole;
// Delete a department
function deleteDepartment(departmentId) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = `DELETE FROM departments WHERE id = $1`;
        yield connection_js_1.pool.query(query, [departmentId]);
    });
}
exports.deleteDepartment = deleteDepartment;
// Ensure all functions are exported
