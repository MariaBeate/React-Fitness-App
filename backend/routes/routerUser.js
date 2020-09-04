/*In der router.js definieren wir unsere Routen und verpacken danach die Logik darin. 
Grund, wieso wir hier eine extra Datei benutzen ist die Übersichtlichkeit. 
Wenn Deine Anwendung irgendwann 20 oder noch mehr Routen hat, gibt es ein großes Chaos in der index.js. 
Deshalb lagern wir unsere Routen aus.
*/

const express = require("express");
const routerUser = express.Router();
const bcrypt = require("bcryptjs");
const uuid = require("uuid");
const jwt = require("jsonwebtoken");
const db = require("../db.js");
const userMiddleware = require("../middleware/users.js");
const { isLoggedIn } = require("../middleware/users.js");
routerUser.post(
  "/sign-up",
  userMiddleware.validateRegister,
  (req, res, next) => {
    db.query(
      `SELECT * FROM accounts WHERE LOWER(username) = LOWER(${db.escape(
        req.body.username
      )});`,
      (err, result) => {
        if (result.length) {
          return res.status(409).send({
            msg: "This username is already in use!",
          });
        } else {
          // username is available
          bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
              return res.status(500).send({
                msg: err,
              });
            } else {
              // has hashed pw => add to database
              db.query(
                `INSERT INTO accounts (id, username, password, registered) VALUES ('${uuid.v4()}', ${db.escape(
                  req.body.username
                )}, ${db.escape(hash)}, now())`,
                (err, result) => {
                  if (err) {
                    throw err;
                    return res.status(400).send({
                      msg: err,
                    });
                  }
                  return res.status(201).send({
                    msg: "Registered!",
                  });
                }
              );
            }
          });
        }
      }
    );
  }
);

routerUser.post("/login", (req, res, next) => {
  db.query(
    `SELECT * FROM accounts WHERE username = ${db.escape(req.body.username)};`,
    (err, result) => {
      // user does not exists
      if (err) {
        throw err;
        return res.status(400).send({
          msg: err,
        });
      }
      if (!result.length) {
        return res.status(401).send({
          msg: "Username or password is incorrect!",
        });
      }
      // check password
      bcrypt.compare(
        req.body.password,
        result[0]["password"],
        (bErr, bResult) => {
          // wrong password
          if (bErr) {
            throw bErr;
            return res.status(401).send({
              msg: "Username or password is incorrect!",
            });
          }
          if (bResult) {
            const token = jwt.sign(
              {
                username: result[0].username,
                userId: result[0].id,
              },
              "SECRETKEY",
              {
                expiresIn: "1h",
              }
            );
            db.query(
              `UPDATE accounts SET last_login = now() WHERE id = '${result[0].id}'`
            );
            return (info = res.status(200).send({
              msg: "Logged in!",
              token,
              user: result[0],
            }));
          }
          return res.status(401).send({
            msg: "Username or password is incorrect!",
          });
        }
      );
    }
  );
});
routerUser.get("/secret-route", userMiddleware.isLoggedIn, (req, res, next) => {
  console.log(req.userData);
  res.send("This is the secret content. Only logged in users can see that!");
});
module.exports = routerUser;