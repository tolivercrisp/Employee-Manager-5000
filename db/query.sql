-- View all departments
SELECT id, name FROM department;

-- View all roles
SELECT role.id, role.title, department.name AS department, role.salary
FROM role
JOIN department ON role.department_id = department.id;

-- View all employees
SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, manager.first_name AS manager
FROM employee
JOIN role ON employee.role_id = role.id
JOIN department ON role.department_id = department.id
LEFT JOIN employee AS manager ON employee.manager_id = manager.id;

-- Add a department
INSERT INTO department (name) VALUES (:name);

-- Add a role
INSERT INTO role (title, salary, department_id) VALUES (:title, :salary, :department_id);

-- Add an employee
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (:first_name, :last_name, :role_id, :manager_id);

-- Update an employee role
UPDATE employee
SET role_id = :role_id
WHERE id = :employee_id;
