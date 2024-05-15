require("dotenv").config();
require("./db");

const express = require("express");
const app = express();

require("./config")(app);

const allRoutes = require("./routes/index");
app.use("/", allRoutes);

const cohortRoutes = require("./routes/cohort.routes");
app.use("/api", cohortRoutes);

const studentRoutes = require("./routes/student.routes");
app.use("/api", studentRoutes);

module.exports = app;
