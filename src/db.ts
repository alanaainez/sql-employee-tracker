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
    } finally {
      client.release();
    }
  }

  async findAllEmployees() {
    const sql = 'SELECT * FROM employees';
    return this.query(`
      SELECT employees.id, employees.first_name, employees.last_name, roles.title AS job_title, departments.department_name AS department, roles.salary, 
      COALESCE(CONCAT(manager.first_name, ' ', manager.last_name), 'None') AS manager
      FROM employees
      LEFT JOIN roles ON employees.role_id = roles.id
      LEFT JOIN departments ON roles.department_id = departments.id
      LEFT JOIN employees AS manager ON employees.manager_id = manager.id
      ORDER BY employees.id;
    `);
  }
}