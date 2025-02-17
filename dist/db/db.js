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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const pool = new pg_1.Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
});
class Db {
    query(text, params) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield pool.connect();
            try {
                const res = yield client.query(text, params);
                return res;
            }
            catch (error) {
                console.error('Database query error:', error);
                throw error;
            }
            finally {
                client.release();
            }
        });
    }
    findAllEmployees() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.query(`
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
            }
            catch (error) {
                console.error('Error fetching employees:', error);
                throw error;
            }
        });
    }
    getEmployeesByManager(managerId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.query(`
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
            }
            catch (error) {
                console.error(`Error fetching employees by manager ${managerId}:`, error);
                throw error;
            }
        });
    }
    getEmployeesByDepartment(departmentId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.query(`
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
            }
            catch (error) {
                console.error(`Error fetching employees by department ${departmentId}:`, error);
                throw error;
            }
        });
    }
    getUtilizedBudget(departmentId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `
        SELECT SUM(roles.salary) AS total_budget 
        FROM employees 
        JOIN roles ON employees.role_id = roles.id 
        WHERE roles.department_id = $1
      `;
                return yield this.query(query, [departmentId]);
            }
            catch (error) {
                console.error(`Error calculating budget for department ${departmentId}:`, error);
                throw error;
            }
        });
    }
    updateEmployeeManager(employeeId, newManagerId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.query('UPDATE employees SET manager_id = $1 WHERE id = $2;', [newManagerId, employeeId]);
            }
            catch (error) {
                console.error(`Error updating manager for employee ${employeeId}:`, error);
                throw error;
            }
        });
    }
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            yield pool.end();
        });
    }
}
exports.default = Db;
