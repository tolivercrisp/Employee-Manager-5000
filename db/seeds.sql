-- Insert sample data into the department table
INSERT INTO department (id, department_name)
VALUES  (001, 'HR'),
        (002, 'IT'),
        (003, 'Marketing');

-- Insert sample data into the role table
INSERT INTO role (id, title, salary, department_id)
VALUES  (001, 'HR Manager', 50000, 1),
        (002, 'HR Assistant', 40000, 1),
        (003, 'Marketing Manager', 50000, 2),
        (004, 'Marketing Assistant', 50000, 2);
        (004, 'IT Manager', 50000, 3),
        (006, 'IT Assistant', 40000, 3);
     

-- Insert sample data into the employee table
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES  (001, 'Michael', 'Bluth', 1, 1);
        (002, 'George-Micheal', 'Bluth', 1, 1),
        (003, 'Lucille', 'Bluth', 2, 2),
        (004, 'Lindsay', 'Bluth', 2, 2),
        (005, 'Gob', 'Bluth', 3, 3),
        (006, 'Buster', 'Bluth', 3, 3);
