import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});

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
export async function deleteEmployee(employeeId: number) {
    try {
        await pool.query('DELETE FROM employees WHERE id = $1', [employeeId]);
        console.log(`Deleted employee with ID ${employeeId}`);
    } catch (error) {
        const err = error as Error;
        throw new Error(`Error deleting employee with ID ${employeeId}: ${err.message}`);
    }
}

// Delete a department
export async function deleteDepartment(departmentId: number) {
    try {
        await pool.query('DELETE FROM departments WHERE id = $1', [departmentId]);
        console.log(`Deleted department with ID ${departmentId}`);
    } catch (error) {
        const err = error as Error;
        throw new Error(`Error deleting department with ID ${departmentId}: ${err.message}`);
    }
}

// Delete a role
export async function deleteRole(roleId: number) {
    try {
        await pool.query('DELETE FROM roles WHERE id = $1', [roleId]);
        console.log(`Deleted role with ID ${roleId}`);
    } catch (error) {
        const err = error as Error;
        throw new Error(`Error deleting role with ID ${roleId}: ${err.message}`);
    }
}