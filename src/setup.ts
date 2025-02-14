import { pool } from './db/connection';
import fs from 'fs';

async function resetDatabase() {
    const schema = fs.readFileSync('./db/schema.sql', 'utf8');
    const seeds = fs.readFileSync('./db/seeds.sql', 'utf8');

    try {
        await pool.query(schema);
        await pool.query(seeds);
        console.log('Database reset successfully.');
    } catch (error) {
        console.error('Error resetting database:', error);
    } finally {
        pool.end();
    }
}

resetDatabase();
