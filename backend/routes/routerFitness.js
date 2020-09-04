const express = require("express");
const db = require("../db.js");
const routerFitness = express.Router();

//Creating GET Router to fetch all the learner details from the MySQL Database
routerFitness.get("/fitness", (req, res) => {
  db.query("SELECT * FROM events", (err, rows, fields) => {
    if (!err) res.send(rows);
    else console.log(err);
  });
});

//Creating GET Router to fetch all the events from Database for the Calendar
routerFitness.get("/fitnessevents", (req, res) => {
  db.query("SELECT * FROM events", (err, rows, fields) => {
    if(!err) res.send(rows);
    else console.log(err);
  });
});

//Router to GET specific learner detail from the MySQL database
routerFitness.get("/fitness/:id", (req, res) => {
  db.query(
    "SELECT * FROM events WHERE id = ?",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
});
//route for insert data
routerFitness.post("/addCourse", (req, res) => {
  let data = {
    // date: req.body.date,
    title: req.body.title,
    price: req.body.price,
    description: req.body.description,
    date: req.body.date,
    endDate: req.body.endDate,
  };
  let sql = "INSERT INTO events SET ?";
  db.query(sql, data, (err, results) => {
    if (err) throw err;
    res.redirect("/api/fitness");
  });
});

//route for insert data into event
routerFitness.post("/addEvent", (req, res) => {
  let data = {
    // date: req.body.date,
    title: req.body.title,
    date: req.body.date,
    endDate: req.body.endDate,
  };
  let sql = "INSERT INTO events SET ?";
  db.query(sql, data, (err, results) => {
    if (err) throw err;
    res.redirect("/api/fitness");
  }
  );
});

routerFitness.put("/fitness/:id", function (req, res) {
  let data = {
    // date: req.body.date,
    title: req.body.title,
    price: req.body.price,
    description: req.body.description,
    date: req.body.date,
    endDate: req.body.endDate,
  };
  console.log("Put received");
  db.query(
    "UPDATE events SET ? WHERE id = ?",
    [data, req.params.id],
    (err, result) => {
      if (err) {
        console.log(err.message);
        throw err;
      }
      res.send(data);
      //res.redirect("/api/fitness");
    }
  );
});

routerFitness.delete("/fitness/:id", (req, res) => {
  db.query(
    "DELETE FROM events WHERE id = ?",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) {
        console.log("Fitness deleted successfully.");
        res.redirect("/api/fitness");
      } else console.log(err);
    }
  );
});

module.exports = routerFitness;
