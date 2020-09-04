/*Eine Middleware ist quasi ein kleines Programm, was zwischen zwei Komponenten geschaltet ist. 
In diesem Fall haben wir zwischen unserem Request und der eigentlichen Registrierung eine Middleware, 
die die eingegebenen Daten validiert. 
*/

module.exports = {
  validateRegister: (req, res, next) => {
    // username min length 3
    if (!req.body.username || req.body.username.length < 3) {
      return res.status(400).send({
        msg: "Please enter a username with min. 3 chars",
      });
    }
    // password min 6 chars
    if (!req.body.password || req.body.password.length < 6) {
      return res.status(400).send({
        msg: "Please enter a password with min. 6 chars",
      });
    }
    // password (repeat) does not match
    if (
      !req.body.password_repeat ||
      req.body.password != req.body.password_repeat
    ) {
      return res.status(400).send({
        msg: "Both passwords must match",
      });
    }
    next();
  },
  isLoggedIn: (req, res, next) => {
    try {
      //const token = req.headers.authorization.split(" ")[1];
      const token = req.headers.authorization;
      const decoded = jwt.verify(token, "SECRETKEY");
      req.userData = decoded;
      return (info = res.status(200).send({
        msg: "Logged in!",
        token,
      }));
      next();
    } catch (err) {
      return res.status(401).send({
        msg: "Your session is not valid!",
      });
    }
  },
};