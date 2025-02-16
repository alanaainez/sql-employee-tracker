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

export default class Db {
  async query(text: string, params?: any[]) {
    const client = await pool.connect();
    try {
      const res = await client.query(text, params);
      return res;
    } catch (error) {
      console.error('Database query error:', error);
      throw error;
    } finally {
      client.release();
    }
  }

  async findAllEmployees() {
    try {
      return await this.query(`
        SELECT employees.id, employees.first_name, employees.last_name, 
               roles.title AS job_title, departments.department_name AS department, 
               roles.salary, 
               COALESCE(CONCAT(manager.first_name, ' ', manager.last_name), 'None') AS manager
        FROM employees
        LEFT JOIN roles ON employees.role_id = roles.id
        LEFT JOIN departments ON roles.department_id = departments.id
        LEFT JOIN employees AS manager ON employees.manager_id = manager.id
        ORDER BY employees.id;
      `);
    } catch (error) {
      console.error('Error fetching employees:', error);
      throw error;
    }
  }

  async getEmployeesByManager(managerId: number) {
    try {
      return await this.query(`
        SELECT employees.id, employees.first_name, employees.last_name, 
               roles.title AS job_title, departments.department_name AS department, 
               roles.salary, 
               COALESCE(CONCAT(manager.first_name, ' ', manager.last_name), 'None') AS manager
        FROM employees
        LEFT JOIN roles ON employees.role_id = roles.id
        LEFT JOIN departments ON roles.department_id = departments.id
        LEFT JOIN employees AS manager ON employees.manager_id = manager.id
        WHERE employees.manager_id = $1
        ORDER BY employees.id;
      `, [managerId]);
    } catch (error) {
      console.error(`Error fetching employees by manager ${managerId}:`, error);
      throw error;
    }
  }

  async getEmployeesByDepartment(departmentId: number) {
    try {
      return await this.query(`
        SELECT employees.id, employees.first_name, employees.last_name, 
               roles.title AS job_title, departments.department_name AS department, 
               roles.salary, 
               COALESCE(CONCAT(manager.first_name, ' ', manager.last_name), 'None') AS manager
        FROM employees
        LEFT JOIN roles ON employees.role_id = roles.id
        LEFT JOIN departments ON roles.department_id = departments.id
        LEFT JOIN employees AS manager ON employees.manager_id = manager.id
        WHERE roles.department_id = $1
        ORDER BY employees.id;
      `, [departmentId]);
    } catch (error) {
      console.error(`Error fetching employees by department ${departmentId}:`, error);
      throw error;
    }
  }

  async getUtilizedBudget(departmentId: number): Promise<any> {
    try {
      const query = `
        SELECT SUM(roles.salary) AS total_budget 
        FROM employees 
        JOIN roles ON employees.role_id = roles.id 
        WHERE roles.department_id = $1
      `;
      return await this.query(query, [departmentId]);
    } catch (error) {
      console.error(`Error calculating budget for department ${departmentId}:`, error);
      throw error;
    }
  }

  async close() {
    await pool.end();
  }
}
