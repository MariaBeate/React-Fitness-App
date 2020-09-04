//Unsere Einstiegsdatei ist die index.js und beinhaltet das Starten unsere Webservers und
//die Einbindung der Routen, die wir in der Datei routes/router.js definieren.

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
// set up port
const PORT = process.env.PORT || 9000;
app.use(bodyParser.json());
app.use(cors());
// add routes
const routerUser = require("./routes/routerUser.js");
const routerFitness = require("./routes/routerFitness.js");
app.use("/api", routerUser);
app.use("/api", routerFitness);
// run server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
