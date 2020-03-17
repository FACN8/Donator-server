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

const addNewUser = (
  user_name,
  password,
  full_name,
  address,
  city,
  phone_number
) =>
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

  const updateUser = (full_name, password, address, city, user_id) => {
    new Promise((resolve, reject) => {
      // Update user profile based on his id
      dbConnection.query(
        "UPDATE users SET full_name = $1, password = $2, address = $3, city = $4, phone_number = $5 WHERE id = $6",
        [full_name, password, address, city, phone_number,user_id],
        err => {
          if (err) {
            return reject(new Error("Update user failed"));
          }
          resolve("success");
        }
      );
    });
  };
  

const addDonation = (user_id, org_id, type, info, delivery) => {
  new Promise((resolve, reject) => {
    // adds all the info into donations database
    dbConnection.query(
      "INSERT INTO donations (user_id, org_id, type, info, delivery) values($1, $2, $3,$4,$5)",
      [user_id, org_id, type, info, delivery],
      err => {
        if (err) {
          return reject(new Error("Donation failed"));
        }
        resolve("success");
      }
    );
  });
};

const getUserDonations = user_id => {
  new Promise((resolve, reject) => {
    // get all the donations that where mae by user
    dbConnection.query(
      "SELECT user_id,org_id,count(*) as count FROM donations WHERE user_id = $1 GROUP BY user_id,org_id",
      [user_id],
      (err, res) => {
        if (err) {
          return reject(new Error("No donations where found for this user"));
        }
        resolve(res.rows);
      }
    );
  });
};

module.exports = {
  findByUsername,
  addNewUser,
  updateUser,
  getUserDonations,
  addDonation
};
