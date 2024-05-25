const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

require("dotenv").config();

const userRoutes = require("./routes/user");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());

app.use(userRoutes);

mongoose
  .connect(process.env.MONGODB_URI)
  .then((result) => {
    console.log("Database is Connected");

    app.listen(9000, (err) => {
      if (err) {
        console.log("Server is Down", err);
      }

      console.log("Server is Up");
    });
  })
  .catch((err) => {
    console.log("Error connecting to the database on the server page", err);
  });
