const mysql = require("mysql2");
const inquirer = require("inquirer");
const consoleTable = require("console.table");

// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Password214",
    database: "bluth_db",
  },
    console.log(`
    --------------------------------
      ✅ MYSQL connection secured.
    --------------------------------
  `)
);

db.connect(function (err) {
  if (err) throw err;
    console.log(`
    ---------------------------------------------------------
      ✅ Connected to the [ bluth_db ] database as id: ` + db.threadId + `
    ---------------------------------------------------------
    `
    );
    console.log(`
    ---------------------------------------------------
      🍌 Welcome to the Bluth Family C.M.S system! 🍌
    ---------------------------------------------------
    `);
    
    // Begins the initial Inquirer prompts
    mainPrompt();
  }
);

function mainPrompt() {
  inquirer
    .prompt({
      name: "main",
      type: "list",
      message: "Press (ENTER) to select a category below ...",
      choices: [
        "View ALL departments",
        "View ALL roles",
        "View ALL employees",
        "Add a department",
        "Add a role",
        "Add an employee",
        "Update an employee role",
      ],
    })
    .then(function ({ main}) {

      // Switch statement that handles the user choices and calls the respective function.
      // ex. If "View ALL Departments" is selected, the viewAllDepartments() function is called.
      switch (main) {
        case "View ALL departments":
          viewAllDepartments();
          break;

        case "View ALL roles":
          viewAllRoles();
          break;

        case "View ALL employees":
          viewAllEmployees();
          break;
    

        case "Add a department":
          addDepartment();
          break;

       
        case "Add a role":
          addRole();
          break;

        case "Add an employee":
          addEmployee();
          break;

        case "Update an employee role":
          updateEmployeeRole();
          break;
      }
    });
};

// --------------------- (Start of ViewALL functions) ---------------------
function viewAllDepartments() {
  console.log(
    `
    ---------------------------------
      🔭 Viewing ALL Departments ...
    ---------------------------------
    `
  );

  // Query the database to select all items in 'department' table
  db.query("SELECT * FROM department", (err, results) => {
    if (err) throw err;
    console.table(results);
    mainPrompt();
  });
};

// Displays all Roles
function viewAllRoles() {
  console.log(
    `
    ----------------------------
      🔭 Viewing ALL Roles ...
    ----------------------------
    `
  );

  db.query(`
  
  SELECT r.title, r.id, d.name AS department, r.salary FROM role r
  LEFT JOIN department d ON d.id = r.department_id
  
    
  `, (err, results) => {
    if (err) throw err;
    console.table(results);
    mainPrompt();
  });
};

// Displays all Employees
function viewAllEmployees() {
  console.log(
    `
    --------------------------------
      🔭 Viewing ALL Employees ...
    --------------------------------
    `
  );

  // Query the database to select all items in 'employee' table
  db.query(`
  
  SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, m.first_name AS manager FROM employee e
  LEFT JOIN role r ON e.role_id = r.id
  LEFT JOIN department d ON d.id = r.department_id
  LEFT JOIN employee m ON m.id = e.manager_id
    
  `, (err, results) => {
    if (err) throw err;
    console.table(results);
    mainPrompt();
  });
};

// --------------------- (End of "View" functions) ---------------------


// --------------------- (Start of "Add" functions) ---------------------
function addDepartment() {
  inquirer
    .prompt({
      name: "newDepartment",
      type: "input",
      message: " 📝 Please enter the NAME of the new department:",
    })
    .then((answer) => {
      const newDepartment = answer.newDepartment;

      db.query(
        `INSERT INTO department (name) VALUES (?)`,
        newDepartment,
        (err, results) => {
          if (err) throw err;
          console.log(`
          -----------------------------------------------------
          🏠 New Department "${newDepartment}" added successfully!
          -----------------------------------------------------

          `);
          mainPrompt();
        }
      );
    });
  };



function addRole() {
  inquirer
    .prompt([
      {
        name: "newRoleTitle",
        type: "input",
        message: " 📝 Please enter the TITLE of the new role:",
      },
      {
        name: "newRoleSalary",
        type: "input",
        message: " 📝 Please enter the SALARY of the new role:",
      },
      {
        name: "newRoleDepartment",
        type: "input",
        message: " 📝 Please enter the DEPARTMENT ID of the new role:",
      },
    ])
  .then((answer) => {
    const newRoleTitle = answer.newRoleTitle;

    db.query(
      `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`,
      [answer.newRoleTitle, answer.newRoleSalary, answer.newRoleDepartment],
      (err, results) => {
        if (err) throw err;
        console.log(`
          --------------------------------------------------
          🛠️ New Role "${newRoleTitle}" added successfully!
          --------------------------------------------------
          `);
        mainPrompt();
      });
    });
  };

function addEmployee() {

};

// --------------------- (End of "Add" functions) ---------------------


// --------------------- (Start of "Update" function) ---------------------

function updateEmployeeRole() {

};

// --------------------- (End of "Update" function) ---------------------






