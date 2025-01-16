DROP DATABASE IF EXISTS role_db;
CREATE DATABASE role_db;

\c role_db;

CREATE TABLE roles {
    id: SERIAL PRIMARY KEY,
    title: VARCHAR(30) UNIQUE NOT NULL,
    salary: DECIMAL NOT NULL,
    department_id: INTEGER NOT NULL,
}
