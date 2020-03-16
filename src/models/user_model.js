const dbConnection = require("../database/db_connection");

const findByUsername = name =>
  new Promise((resolve, reject) => {
    // will stop at the first user found
    dbConnection.query(
      "SELECT * FROM users WHERE user_name = $1",
      [name],
      (err, res) => {
        if (err) {
          return reject(new Error("No user was found"));
        }
        resolve(res.rows);
      }
    );
  });

  const findOrganization = () =>
  new Promise((resolve, reject) => {
    // Getting info about which organizations is chosen by the user
    dbConnection.query(
      "SELECT * FROM organizations",
      (err, res) => {
        if (err) {
          return reject(new Error("No user was found"));
        }
        resolve(res.rows);
      }
    );
  });


const addNewUser = (user_name, password, full_name, address, city, phone_number) =>
  new Promise((resolve, reject) => {
    // if the user exists then do not add him to our database
    findByUsername(user_name)
      .then(() => {
        dbConnection.query(
          "INSERT INTO users (user_name, password, full_name, address, city, phone_number) values($1, $2, $3,$4,$5,$6)",
          [user_name, password, full_name, address, city, phone_number],
          (err, res) => {
            if (err) {
              return reject(new Error("Didn`t add user"));
            }
            resolve("success");
          }
        );
      })
      .catch(err => {
        return reject(new Error("User already exists in our database"));
      });
  });

  const addDonation = (user_id, org_id, type, info, delivery) => {
    new Promise((resolve, reject) => {
      // adds all the info into donations database
      dbConnection.query(
        "INSERT INTO donations (user_id, org_id, type, info, delivery) values($1, $2, $3,$4,$5)",
          [user_id, org_id, type, info, delivery],
        err => {
          if (err) {
            return reject(new Error("No user was found"));
          }
          resolve("success");
        }
      );
    });
  };



module.exports = {
  findByUsername,
  addNewUser,
  addDonation,
  findOrganization
};
