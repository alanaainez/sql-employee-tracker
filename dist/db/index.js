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
const connection_js_1 = require("./connection.js");
class Db {
    constructor() { }
    query(sql, args = []) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield connection_js_1.pool.connect();
            try {
                const result = yield client.query(sql, args);
                return result.rows;
            }
            finally {
                client.release();
            }
        });
    }
    findAllEmployees() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.query(`
            SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.department_name AS department, roles.salary, 
            CONCAT(manager.first_name, ' ', manager.last_name) AS manager
            FROM employees
            LEFT JOIN roles ON employees.role_id = roles.id
            LEFT JOIN departments ON roles.department_id = departments.id
            LEFT JOIN employees AS manager ON employees.manager_id = manager.id
            ORDER BY employees.id;
        `);
        });
    }
}
exports.default = Db;
