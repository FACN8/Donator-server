const { Pool } = require("pg");
const url = require("url");
require("dotenv").config();

let DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) throw new Error("Enviroment variable DATABASE_URL must be set");

const params = url.parse(DATABASE_URL);

const [user, password] = params.auth.split(":");

const options = {
    host: params.hostname,
    port: params.port,
    database: params.pathname.split("/")[1],
    max: process.env.MAX_CONNECTIONS || 2,
    user,
    password,
    ssl: params.hostname !== "localhost"
};

module.exports = new Pool(options);