const inquirer = require('inquirer');
const queries = require('./queries');

async function viewDepartmentsCommand() {
  console.log('\nViewing departments...\n');
  await queries.viewDepartments();
}

async function viewRolesCommand() {
  console.log('\nViewing roles...\n');
  await queries.viewRoles();
}

async function viewEmployeesCommand() {
  console.log('\nViewing employees...\n');
  await queries.viewEmployees();
}

async function addDepartmentCommand() {
  const { name } = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Enter the department name:'
    }
  ]);
  await queries.addDepartment({ name });
  console.log('\nDepartment added successfully!\n');
}

async function addRoleCommand() {
  const { title, salary, departmentId } = await inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'Enter the role title:'
    },
    {
      type: 'input',
      name: 'salary',
      message: 'Enter the role salary:'
    },
    {
      type: 'input',
      name: 'departmentId',
      message: 'Enter the department id:'
    }
  ]);
  await queries.addRole({ title, salary, department_id: departmentId });
  console.log('\nRole added successfully!\n');
}

async function addEmployeeCommand() {
  const { firstName, lastName, roleId, managerId } = await inquirer.prompt([
    {
      type: 'input',
      name: 'firstName',
      message: 'Enter the employee first name:'
    },
    {
      type: 'input',
      name: 'lastName',
      message: 'Enter the employee last name:'
    },
    {
      type: 'input',
      name: 'roleId',
      message: 'Enter the employee role id:'
    },
    {
      type: 'input',
      name: 'managerId',
      message: 'Enter the employee manager id (optional):'
    }
  ]);
    await queries.addEmployee({ first_name: firstName, last_name: lastName, role_id: roleId, manager_id: managerId });
    console.log('\nEmployee added successfully!\n');
    }
  
    async function updateEmployeeRoleCommand() {
    const { employeeId, roleId } = await inquirer.prompt([
    {
      type: 'input',
      name: 'employeeId',
      message: 'Enter the employee id:'
    },
    {
      type: 'input',
      name: 'roleId',
      message: 'Enter the new role id:'
    }
  ]);
    await queries.updateEmployeeRole(employeeId, roleId);
    console.log('\nEmployee role updated successfully!\n');
    }
  
  module.exports = {
  viewDepartmentsCommand,
  viewRolesCommand,
  viewEmployeesCommand,
  addDepartmentCommand,
  addRoleCommand,
  addEmployeeCommand,
  updateEmployeeRoleCommand
  };
