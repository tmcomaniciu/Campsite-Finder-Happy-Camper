import express from "express";
const { Request, Response } = express;

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    let user = await User.findOne({
      email: req.body.email,
    });

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    user = new User(req.body);
    await user.save();
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "something went wrong" });
  }
});
