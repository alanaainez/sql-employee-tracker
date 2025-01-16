DROP DATABASE IF EXISTS department_db;
CREATE DATABASE department_db;

\c department_db;

CREATE TABLE departments {
    id: SERIAL PRIMARY KEY,
    department_name: VARCHAR(30) UNIQUE NOT NULL
}
