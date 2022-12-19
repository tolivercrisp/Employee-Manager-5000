const inquirer = require("inquierer");
const connection = require('./connection');
const queries = require('./queries')

const commands = {
    async viewDepartments() {
        const [row, fields] = await
    connection.promise().query(queries.selectDepartments);
        console.table(rows);
    },

    async viewRoles() {
        const [row, fields] = await
    connection.promise().query(queries.select)
    }
}