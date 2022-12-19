-- Insert sample data into the department table
INSERT INTO department (id, name) VALUES (1, 'HR');
INSERT INTO department (id, name) VALUES (2, 'IT');
INSERT INTO department (id, name) VALUES (3, 'Marketing');

-- Insert sample data into the role table
INSERT INTO role (id, title, salary, department_id) VALUES (1, 'HR Manager', 10000, 1);
INSERT INTO role (id, title, salary, department_id) VALUES (2, 'IT Manager', 15000, 2);
INSERT INTO role (id, title, salary, department_id) VALUES (3, 'Marketing Manager', 20000, 3);
INSERT INTO role (id, title, salary, department_id) VALUES (4, 'HR Assistant', 5000, 1);
INSERT INTO role (id, title, salary, department_id) VALUES (5, 'IT Assistant', 7000, 2);
INSERT INTO role (id, title, salary, department_id) VALUES (6, 'Marketing Assistant', 8000, 3);

-- Insert sample data into the employee table
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (1, 'John', 'Doe', 1, null);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (2, 'Jane', 'Doe', 2, 1);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (3, 'Bob', 'Smith', 3, 2);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (4, 'Alice', 'Smith', 4, 1);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (5, 'Charlie', 'Brown', 5, 2);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (6, 'Eve', 'Brown', 6, 3);
