const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT;
const mongoose = require("mongoose");
const Student = require("./models/Student.model");
const Cohort = require("./models/Cohort.model");

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// const students = require("./students.json");
// const cohorts = require("./cohorts.json");

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();

// MIDDLEWARE
// Research Team - Set up CORS middleware here:
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

mongoose
  .connect("mongodb://127.0.0.1:27017/cohort-tools-api")
  .then(() => console.log("Connected!"));

// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

// Retrieves all
app.get("/api/cohorts", (req, res) =>
  Cohort.find()
    .then((cohorts) => res.status(200).json(cohorts))
    .catch((err) => res.status(500).json({ "error-message": err.message }))
);
app.get("/api/students", (req, res) =>
  Student.find()
    .then((students) => res.status(200).json(students))
    .catch((err) => res.status(500).json({ "error-message": err.message }))
);

// Creates a new one
app.post("/api/cohorts", (req, res) =>
  Cohort.create(req.body)
    .then((cohort) => res.status(201).json(cohort))
    .catch((err) => res.status(500).json({ "error-message": err.message }))
);
app.post("/api/students", (req, res) =>
  Student.create(req.body)
    .then((student) => res.status(201).json(student))
    .catch((err) => res.status(500).json({ "error-message": err.message }))
);

// Retrieves a specific one by id
app.get("/api/cohorts/:cohortId", (req, res) =>
  Cohort.findById(req.params.cohortId)
    .then((cohort) => res.status(200).json(cohort))
    .catch((err) => res.status(500).json({ "error-message": err.message }))
);
app.get("/api/students/:studentId", (req, res) =>
  Student.findById(req.params.studentId)
    .then((student) => res.status(200).json(student))
    .catch((err) => res.status(500).json({ "error-message": err.message }))
);

// Updates a specific one by id
app.put("/api/cohorts/:cohordId", (req, res) =>
  Cohort.findByIdAndUpdate(req.params.cohortId, req.body, { new: true })
    .then((cohort) => res.status(200).json(cohort))
    .catch((err) => res.status(500).json({ "error-message": err.message }))
);
app.put("/api/students/:studentId", (req, res) =>
  Student.findByIdAndUpdate(req.params.studentId, req.body, { new: true })
    .then((student) => res.status(200).json(student))
    .catch((err) => res.status(500).json({ "error-message": err.message }))
);

// Deletes a specific one by id
app.delete("/api/cohorts/:cohortId", (req, res) =>
  Cohort.findByIdAndDelete(req.params.cohortId)
    .then(() => res.status(204).send())
    .catch((err) => res.status(500).json({ "error-message": err.message }))
);
app.delete("/api/students/:studentId", (req, res) =>
  Student.findByIdAndDelete(req.params.studentId)
    .then(() => res.status(204).send())
    .catch((err) => res.status(500).json({ "error-message": err.message }))
);

// Retrieves all of the students for a given cohort
app.get("/api/students/cohort/:cohortId", (req, res) =>
  Student.find({ cohort: req.params.cohortId })
    .then((students) => res.status(200).json(students))
    .catch((err) => res.status(500).json({ "error-message": err.message }))
);

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
