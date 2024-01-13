import express from "express";
const { Request, Response } = express;
import "dotenv/config";
import mongoose from "mongoose";

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/test", async (req, res) => {
  try {
    res.json({ message: "express endpoint" });
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred");
  }
});

app.listen(3000, () => {
  console.log("server connected and running on localhost/3000");
});
