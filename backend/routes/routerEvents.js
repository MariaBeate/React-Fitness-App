const express = require("express");
const db = require("../db.js");
const routerEvents = express.Router();

//get all calendar events
routerEvents.get("/courses", (req, res) => {
  db.query("SELECT * FROM kursplan", (err, rows, fields) => {
    if (!err) res.send(rows);
    else console.log(err);
  });
});

//add course to calendar
routerEvents.post("/addCourseDate", (req, res) => {
  let data = {
    date: req.body.date,
    title: req.body.title,
  };
  let sql = "INSERT INTO kursplan SET ?";
  db.query(sql, data, (err, results) => {
    if (err) throw err;
    res.redirect("/api/courses");
  });
});

//get course in calendar by id
routerEvents.get("/courses/:id", (req, res) => {
  db.query(
    "SELECT * FROM kursplan WHERE id = ?",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
});

//delete course in calendar by id
routerEvents.delete("/courses/:id", (req, res) => {
  db.query(
    "DELETE FROM kursplan WHERE id = ?",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) {
        console.log("Course deleted successfully.");
        //res.redirect("/api/courses");
      } else console.log(err);
    }
  );
});

//update a course in calendar
routerEvents.put("/courses/:id", function (req, res) {
  let data = {
    date: req.body.date,
    title: req.body.title,
  };
  console.log("Put received");
  db.query(
    "UPDATE kursplan SET ? WHERE id = ?",
    [data, req.params.id],
    (err, result) => {
      if (err) {
        console.log(err.message);
        throw err;
      }
      res.send(data);
    }
  );
});

module.exports = routerEvents;
