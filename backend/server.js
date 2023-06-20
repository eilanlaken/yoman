// imports
const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");

// create app
dotenv.config();
const app = express();

// middleware setup
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// routes
const usersRoutes = require("./routes/users");
app.use("/users", usersRoutes);

// connect to database
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    // listen for requests
    console.log("connected to MongoDB!");
    app.listen(process.env.PORT, () => {
      console.log(`Listening on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error("error", error);
  });
