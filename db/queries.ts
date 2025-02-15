import { pool } from './connection.js';

// Get all departments
export async function getAllDepartments() {
    return pool.query('SELECT * FROM departments;');
}

// Get all roles
export async function getAllRoles() {
    return pool.query(`
        SELECT roles.id, roles.title, departments.department_name, roles.salary 
        FROM roles
        JOIN departments ON roles.department_id = departments.id;
    `);
}

// Get all employees
export async function getAllEmployees() {
    return pool.query(`
        SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.department_name, employees.manager_id 
        FROM employees
        JOIN roles ON employees.role_id = roles.id
        JOIN departments ON roles.department_id = departments.id;
    `);
  }

// Add a new department
export async function addDepartment(name: string) {
    return pool.query('INSERT INTO departments (department_name) VALUES ($1);', [name]);
}

// Add a new role
export async function addRole(title: string, salary: number, departmentId: number) {
    return pool.query(
        'INSERT INTO roles (title, salary, department_id) VALUES ($1, $2, $3);',
        [title, salary, departmentId]
    );
}

// Add a new employee
export async function addEmployee(firstName: string, lastName: string, roleId: number, managerId: number | null) {
    return pool.query(
        'INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4);',
        [firstName, lastName, roleId, managerId]
    );
}

// Update an employee's role
export async function updateEmployeeRole(employeeId: number, newRoleId: number) {
    return pool.query('UPDATE employees SET role_id = $1 WHERE id = $2;', [newRoleId, employeeId]);
}
