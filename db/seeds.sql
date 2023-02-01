USE bluth_db;

-- Insert sample data into the department table
INSERT INTO department (name) VALUES ("Banana Stand", "Bluth Company", "Dr. Fünke's 100% Natural Good-Time Family Band Solution", "Tantamount Studios") ;

-- Insert sample data into the role table
INSERT INTO role (title, salary, department_id) VALUES
        ("Mr. Manager", 2000, 1),
        ("Brother", 0, 2)
        ("President", 280000, 2),
        ("Vice President", 280000, 2),
        ("Bluth Chairman", 336000, 2)
        ("House Arrest", 3, 2),
        ("Dr. Fünke Band Member", 0, 3),
        ("Studio Executive", 224000, 4),

-- Insert sample data into the employee table
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES  
        ("George Michael", "Bluth", 1, 4),
        ("Buster", "Bluth ", 2, 5),
        ("Gob", "Bluth", 3, 5),
        ("Michael", "Bluth", 4, 5),
        ("Lucille", "Bluth", 5, NULL),
        ("George", "Bluth", 6, 5),      
        ("Tobias", "Fünke", 7, 8)
        ("Lindsay", "Bluth Fünke", 7, 7),
        ("Maeby", "Fünke", 8, NULL),

        
