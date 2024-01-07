import express from "express";
const { Request, Response } = express;
import "dotenv/config";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/test", async (req, res) => {
  res.json({ message: "express endpoint" });
});

app.listen(3000, () => {
  console.log("server connected and running on localhost/3000");
});
