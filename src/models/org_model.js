const dbConnection = require("../database/db_connection");

const getOrganizations = () =>
  new Promise((resolve, reject) => {
    // Getting info about organizations we work with
    dbConnection.query("SELECT * FROM organizations", (err, res) => {
      if (err) {
        return reject(new Error("No user was found"));
      }
      resolve(res.rows);
    });
  });

const findOrganizationName = org_id =>
  new Promise((resolve, reject) => {
    // Getting organizations name witch is chosen by the user to donate
    dbConnection.query(
      "SELECT name FROM organizations WHERE id = $1",
      [org_id],
      (err, res) => {
        if (err) {
          return reject(new Error("No organization was found"));
        }
        resolve(res.rows);
      }
    );
  });

module.exports = {
  getOrganizations,
  findOrganizationName
};
