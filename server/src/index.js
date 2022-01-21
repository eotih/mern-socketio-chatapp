const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const morgan = require("morgan");


const db = require("./config/db.config");
const route = require("./routes");
const serverIO = require("./controllers/server.controller");

const app = express();

dotenv.config();
db.connectDatabase();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));

route(app);
serverIO(app); // server socket io

app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});
