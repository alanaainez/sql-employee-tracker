import { pool } from './connection.js';

export default class Db {
    constructor() {}

    async query(sql: string, args: any[] = []) {
        const client = await pool.connect();
        try {
            const result = await client.query(sql, args);
            return result.rows;
        } finally {
            client.release();
        }
    }

    async findAllEmployees() {
        return this.query(`
            SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.department_name AS department, roles.salary, 
            CONCAT(manager.first_name, ' ', manager.last_name) AS manager
            FROM employees
            LEFT JOIN roles ON employees.role_id = roles.id
            LEFT JOIN departments ON roles.department_id = departments.id
            LEFT JOIN employees AS manager ON employees.manager_id = manager.id
            ORDER BY employees.id;
        `);
    }
}