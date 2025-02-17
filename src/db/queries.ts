import { pool } from '../db/connection';

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

// Get employees by manager
export async function getEmployeesByManager(managerId: number) {
    return pool.query('SELECT * FROM employees WHERE manager_id = $1;', [managerId]);
}

// Get employees by department
export async function getEmployeesByDepartment(departmentId: number) {
    return pool.query(`
        SELECT employees.id, employees.first_name, employees.last_name, roles.title 
        FROM employees
        JOIN roles ON employees.role_id = roles.id
        WHERE roles.department_id = $1;
    `, [departmentId]);
}

// Get total utilized budget of a department
export async function getUtilizedBudget(departmentId: number) {
    return pool.query(`
        SELECT SUM(roles.salary) AS total_budget
        FROM employees
        JOIN roles ON employees.role_id = roles.id
        WHERE roles.department_id = $1;
    `, [departmentId]);
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

// Update an employee's manager
export async function updateEmployeeManager(employeeId: number, newManagerId: number) {
    return pool.query('UPDATE employees SET manager_id = $1 WHERE id = $2;', [newManagerId, employeeId]);
}

// Delete an employee
export async function deleteEmployee(employeeId: number): Promise<void> {
    const query = `DELETE FROM employees WHERE id = $1`;
    await pool.query(query, [employeeId]);
}

// Delete a role
export async function deleteRole(roleId: number): Promise<void> {
    const query = `DELETE FROM roles WHERE id = $1`;
    await pool.query(query, [roleId]);
}

// Delete a department
export async function deleteDepartment(departmentId: number): Promise<void> {
    const query = `DELETE FROM departments WHERE id = $1`;
    await pool.query(query, [departmentId]);
}

// Ensure all functions are exported
