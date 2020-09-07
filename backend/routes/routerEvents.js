const express = require("express");
const db = require("../db.js");
const routerEvents = express.Router();

//Creating GET Router to fetch all the events from Database for the Calendar
routerEvents.get("/courses", (req, res) => {
    db.query("SELECT * FROM kursplan", (err, rows, fields) => {
      if(!err) res.send(rows);
      else console.log(err);
    });
  });

  // routerEvents.post("/addCourseID", (req, res) => {
  //   let data = {
  //     courseid: req.body.courseid,
  //   };
  //   let sql = "INSERT INTO kursplan (courseid) VALUES (SELECT id FROM events)";
  //   db.query(sql, data, (err, results) => {
  //     if (err) throw err;
  //     res.redirect("/api/fitness");
  //   });
  // });

  routerEvents.post("/addCourseDate", (req, res) => {
    let data = {
      date: req.body.date,
      title: req.body.title,
    };
    let sql = "INSERT INTO kursplan SET ?";
    db.query(sql, data, (err, results) => {
      if (err) throw err;
      res.redirect("/api/fitness");
    });
  });

  module.exports = routerEvents;

