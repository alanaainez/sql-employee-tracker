INSERT INTO departments (id, department_name)
VALUES (1, 'Management'),
        (2, 'Sales'),
        (3, 'Accounting'),
        (4, 'Administration'),
        (5, 'Product Oversight'),
        (6, 'Warehouse');

INSERT INTO employees (last_name, first_name, role_id,)
VALUES ('Scott', 'Michael', 1000),
        ('Schrute', 'Dwight', 1001),
        ('Lapin', 'Phyllis', 2000),
        ('Hudson', 'Stanley', 2001),
        ('Martin', 'Angela', 3000),
        ('Martinez', 'Oscar', 3001),
        ('Bernard', 'Andy', 2001),
        ('Howard', 'Ryan', 2002),
        ('Kapoor', 'Kelly', 4002),
        ('Malone', 'Kevin', 3001),
        ('Flenderson', 'Toby', 4000),
        ('Halpert', 'Jim', 2001),
        ('Beasley', 'Pamela', 4001),
        ('Bratton', 'Creed', 5000),
        ('Palmer', 'Meredith', 5001),
        ('Anderson', 'Roy', 6001),
        ('Philbin', 'Darryl', 6000);

INSERT INTO roles (title, salary, department_id)
VALUES ('Regional Manager', 65000, 1),
        ('Assistant Regional Manager', 35000, 1),
        ('Receptionist', 30000, 4),
        ('Regional Director of Sales', 55000, 2),
        ('Chief Accountant', 50000, 3),
        ('Human Resources', 50000, 4),
        ('Accountant', 45000, 3),
        ('Sales Representative', 40000, 2),
        ('Supplier Relations Representative', 40000, 5),
        ('Customer Service Representative', 35000, 4),
        ('Quality Assurance Representative',40000, 5),
        ('Warehouse Foreman', 45000, 7),
        ('Warehouse Staff', 35000, 7);