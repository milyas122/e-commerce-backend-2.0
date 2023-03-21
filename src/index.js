const express = require("express");
require("./utils/database"); // require DB Connection
require("./models/User");

const app = express();

//Middleware
app.use(express.json());
