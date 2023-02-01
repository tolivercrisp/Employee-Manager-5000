const mysql = require('mysql2');
const inquirer = require('inquirer');
const consoleTable = require('console.table');

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // TODO: Add MySQL password here
    password: 'Password214',
    database: 'employee_db'
  },
  console.log(`💡 Connected to the [employee_db] database. 🔌`)
);

connection.connect(function (err) {
  if (err) {
    throw err;
    console.log('❌ Error Connecting:' + err.stack)
  }
  console.log(`Employee Manager Online!`);
  console.log("Connected as id " + connection.threadId);
  initialPrompt();
});

function initialPrompt() {
  inquirer
    .prompt({
      type: "list",
      name: "task",
      message: "Welcome to Employee Manager",
      choices: [
        "View Employees",
        "View Employees by Department",
        "View All Departments",
        "Add Employee",
        "Remove Employees",
        "Update Employee Role",
        "Add Role",
        "Add Department",
        "End",
      ],
    })
    .then(function ({ task }) {
      switch (task) {
        case "View Employees":
          viewEmployee();
          break;

        case "View Employees by Department":
          viewEmployeeByDepartment();
          break;

        case "View All Departments":
          viewAllDepartments();
          break;

        case "Add Employee":
          addEmployee();
          break;

        case "Remove Employees":
          removeEmployees();
          break;

        case "Update Employee Role":
          updateEmployeeRole();
          break;

        case "Add Role":
          addRole();
          break;

        case "Add Department":
          addDepartment();
          break;

        case "End":
          connection.end();
          break;
      }
    });
}