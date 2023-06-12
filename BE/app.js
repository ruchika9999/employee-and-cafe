const express = require("express");
const cors = require("cors");

const { errorHandler } = require("./middleware/errorHandler");
const employee = require("./routes/employee");
const cafe = require("./routes/cafe");

const app = express();
app.use(cors());

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use("/api/employee", employee);
app.use("/api/cafe", cafe);

app.use(errorHandler);

module.exports = app;