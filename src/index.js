require("./utils/database"); // require DB Connection
require("./models"); //require DB Models

const express = require("express");
const allRoutes = require("./routes");

const app = express();

app.use(express.json());
app.use("/api", allRoutes);

app.listen(process.env.PORT);
