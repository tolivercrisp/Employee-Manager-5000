const mysql = require("mysql2");
const inquirer = require("inquirer");
const consoleTable = require("console.table");

// .env file configuration
const path = require('path')
const dotenv = require('dotenv')

dotenv.config({ path: path.join(__dirname, './.env') })

// Create database connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Connect to the database
db.connect(function (err) {
  if (err) throw err;
  console.log(`
    ---------------------------------------------------------
      ✅ Connected to the [ ${process.env.DB_NAME} ] database as id: ` + db.threadId + `
    ---------------------------------------------------------
  `);
    console.log(`
     __________________   .--.
    |  Welcome to the  |  |__| .-------.
    |   Bluth Family   |  |=.| |.-----.|
    |       CMS        |  |--| ||     ||
    |      SYSTEM!     |  |  | |'-----'|
    |        🍌        |  |__|~')_____('  
    |__________________|   
    
    `);
    // Begins the initial Inquirer prompts
    mainPrompt();
  }
);

// Displays the CMS system main menu
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
  // Query the database for the role table and append the department table
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
  SELECT e.id, e.first_name, e.last_name, r.salary, r.title, d.name AS department, m.first_name AS manager FROM employee e
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
      message: " 📝 What is the NAME of the new department?",
    })
    .then((answer) => {
      const newDepartment = answer.newDepartment;

      db.query(
        `INSERT INTO department (name) VALUES (?)`,
        newDepartment,
        (err, results) => {
          if (err) throw err;
          console.log(`
          --------------------------------------------------------
          🏠 New Department "${newDepartment}" added successfully!
          --------------------------------------------------------
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
        name: "title",
        type: "input",
        message: "📝 What is the TITLE of the role?",
      },
      {
        name: "salary",
        type: "input",
        message: "📝 What is the SALARY for the role?",
      },
      {
        name: "department_id",
        type: "input",
        message: "📝 What is the DEPARTMENT ID for the role?",
      },
    ])
    .then((answers) => {
      // Query to insert user input into the role table
      db.query(
        `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`,
        [answers.title, answers.salary, answers.department_id],
        (err) => {
          if (err) throw err;
          console.log(`
          -----------------------------------------------------
          🏠 New Role "${answers.title}" added successfully!
          -----------------------------------------------------
          `);
          mainPrompt();
        }
      );
    });
  };

  function addEmployee() {
    // Query to select all from the role table
    db.query("SELECT * FROM role", function(err, roles) {
      if (err) throw err;
      // Empty array to store queried role data
      let roleTitles = [];
      for (let i = 0; i < roles.length; i++) {
        roleTitles.push(roles[i].title);
      }
       // Empty array to store queried department data
      db.query("SELECT * FROM employee", function(err, employees) {
        if (err) throw err;
        let employeeNames = [];
        for (let i = 0; i < employees.length; i++) {
          employeeNames.push(`${employees[i].first_name} ${employees[i].last_name}`);
        }
        inquirer
          .prompt([
            {
              name: "firstName",
              type: "input",
              message: "📝 What is the employee's FIRST NAME?"
            },
            {
              name: "lastName",
              type: "input",
              message: "📝 What is the employee's LAST NAME?"
            },
            {
              name: "role",
              type: "list",
              message: "📝 What is the employee's ROLE?",
              choices: roleTitles
            },
            {
              name: "manager",
              type: "list",
              message: "📝 Who is the employee's MANAGER?",
              choices: employeeNames
            }
          ])
          .then(function(answer) {
            let roleID;
            for (let i = 0; i < roles.length; i++) {
              if (roles[i].title === answer.role) {
                roleID = roles[i].id;
              }
            }
            let managerID;
            if (answer.manager === "None") {
              managerID = null;
            } else {
              for (let i = 0; i < employees.length; i++) {
                if (
                  `${employees[i].first_name} ${employees[i].last_name}` ===
                  answer.manager
                ) {
                  managerID = employees[i].id;
                }
              }
            }
            db.query(
              "INSERT INTO employee SET ?",
              {
                first_name: answer.firstName,
                last_name: answer.lastName,
                role_id: roleID,
                manager_id: managerID
              },
              function(err) {
                if (err) throw err;
                console.log(`
                ----------------------------------------------------------------
                💼 New Employee "${answer.firstName} ${answer.lastName}" added!
                ----------------------------------------------------------------
              `);
                mainPrompt();
              }
            );
          });
      });
    });
  }

// --------------------- (End of "Add" functions) ---------------------


// --------------------- (Start of "Update" function) ---------------------

function updateEmployeeRole() {
  let query =
    "SELECT employee.first_name, role.title FROM employee INNER JOIN role ON employee.role_id = role.id";
  db.query(query, function (err, res) {
    if (err) throw err;
    let employeeChoices = res.map(employee => {
      return {
        name: `${employee.first_name} (${employee.title})`,
        value: employee.first_name
      };
    });
    let roleChoices;
    db.query("SELECT title FROM role", function (err, res) {
      if (err) throw err;
      roleChoices = res.map(role => {
        return {
          name: role.title,
          value: role.title
        };
      });
      inquirer
        .prompt([
          {
            name: "employee",
            type: "list",
            message: "📝 Choose the EMPLOYEE  whose role you would like to update:",
            choices: employeeChoices
          },
          {
            name: "role",
            type: "list",
            message: "📝 What is their NEW ROLE?",
            choices: roleChoices
          }
        ])
        .then(function (answer) {
          let query =
            "UPDATE employee SET role_id = (SELECT id FROM role WHERE title = ?) WHERE first_name = ?";
          db.query(query, [answer.role, answer.employee], function (
            err,
            res
          ) {
            if (err) throw err;
            console.log(`
                --------------------------------------------------------------------------------------
                💼 Role for employee "${answer.employee}" updated successfully to "${answer.role}"!
                --------------------------------------------------------------------------------------
              `);
              mainPrompt();
          });
        });
    });
  });
}
 
// --------------------- (End of "Update" function) ---------------------






