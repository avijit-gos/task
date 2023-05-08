/** @format */

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const createError = require("http-errors");
const database = require("./db");
const auth = require("./server/middleware/auth");

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(logger("dev"));

const port = 8080;

// importing public route
app.use("/api/user", require("./server/routes/PublicRoute/PublicRoute"));

// importing user route
app.use("/api", auth, require("./server/routes/userRoutes/userRoutes"));

// If route not found
app.use(async (req, res, next) => {
  next(createError.NotFound("Page not found"));
});

// Error message
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

app.listen(port, () => {
  console.log(`App listening on port:${port}`);
});
