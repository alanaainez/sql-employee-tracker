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

    
}