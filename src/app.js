const express = require("express");
const bodyParser = require("body-parser");
const compression = require("compression");
const controllers = require("./controllers/index");
const helmet = require('helmet')

const app = express();
app.use(helmet());
app.set("port", process.env.PORT || 5000);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(controllers);
module.exports = app;
