const mysql = require("mysql2");
const inquirer = require("inquirer");
const cTable = require("console.table");

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
    ----------------------------
    ✅ MYSQL connection secured.
    ----------------------------
  `)
);

db.connect(function (err) {
  if (err) throw err;
    console.log(`
    -------------------------------------------------------
    ✅ Connected to the [ bluth_db ] database as id: ` + db.threadId + `
    -------------------------------------------------------
    `
    );
    console.log(`
    -----------------------------------------------
    🍌 Welcome to the Bluth Family C.M.S system! 🍌
    -----------------------------------------------
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
        "View ALL Departments",
        "View ALL Roles",
        "View ALL Employees",
        "Add a Department",
        "Add a Role",
        "Add an Employee",
        "Update Employee Role",
        "[-- EXIT --]"
      ],
    })
    .then(function ({ main}) {
      switch (main) {
        case "View ALL Departments":
          viewAllDepartments();
          break;

        case "View ALL Employees":
          viewAllEmployees();
          break;

        case "View ALL Roles":
          viewAllRoles();
          break;

        case "Add a Department":
          addDepartment();
          break;

        case "Add an Employee":
          addEmployee();
          break;

        case "Add a Role":
          addRole();
          break;

        case "Update Employee Role":
          updateEmployeeRole();
          break;

        case "[-- EXIT --]":
          db.end();
          break;
      }
    });
}

