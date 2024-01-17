require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const campRoutes = require("./Controllers/camp_controllers");

const PORT = process.env.PORT;
// const MONGO_URI = process.env.MONGO_URI
const MONGO_URI = "mongodb://localhost:27017/campsites";

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/camps", campRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to Camping....");
});

// db connection

mongoose
  .connect(MONGO_URI)

  .then(() => console.log("db connected"))

  .catch((err) => console.error(err));

app.listen(PORT, () => {
  console.log("listening on port", PORT);
});
