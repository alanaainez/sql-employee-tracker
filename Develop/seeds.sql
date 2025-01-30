INSERT INTO departments (department_name)
VALUES ('Management'),
        ('Sales'),
        ('Accounting'),
        ('Administration'),
        ('Product Oversight'),
        ('Warehouse');

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
        ('Warehouse Foreman', 45000, 6),
        ('Warehouse Staff', 35000, 6);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ('Michael', 'Scott', 1, null),
        ('Dwight', 'Schrute', 2, 1),
        ('Phyllis', 'Lapin', 3, 1),
        ('Stanley', 'Hudson', 4, 3),
        ('Angela', 'Martin', 5, 1),
        ('Oscar', 'Martinez', 6, 5),
        ('Andy', 'Bernard', 4, 3),
        ('Ryan', 'Howard', 7, 3),
        ('Kelly', 'Kapoor', 8, 1),
        ('Kevin', 'Malone', 4, 3),
        ('Toby', 'Flenderson', 9, 1),
        ('Jim', 'Halpert', 4, 3),
        ('Pamela', 'Beasley', 10, 1),
        ('Creed', 'Bratton', 11, 1),
        ('Meredith', 'Palmer', 12, 1),
        ('Roy', 'Anderson', 13, 13),
        ('Darryl', 'Philbin', 13, 1);

