const express = require("express");
const cors = require("cors");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { mongoose } = require("mongoose");
const User = require("./models/User.js");
const app = express();
const imageDownloader = require("image-downloader");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const fs = require("fs");
const Campsite = require("./models/Campsite.js");

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "hpgwirnvwponvwoprjv";

app.use(express.json());
app.use(cookieParser());
app.use("/uploads/", express.static(__dirname + "/uploads"));

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

mongoose.connect(process.env.MONGO_URL);

app.get("/test", (req, res) => {
  res.send("API endpoint test confirmed");
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    res.json(userDoc);
  } catch (e) {
    res.status(422).json(e);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });

  if (userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password);

    if (passOk) {
      jwt.sign(
        { email: userDoc.email, id: userDoc._id, name: userDoc.name },
        jwtSecret,
        {},
        (error, token) => {
          if (error) throw error;
          res.cookie("token", token).json(userDoc);
        }
      );
    } else {
      res.status(400).json("pass not okay");
    }
  } else {
    res.json("User not found");
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const { email, name, _id } = await User.findById(userData.id);
      res.json({ name, email, _id });
    });
  } else {
    res.json(null);
  }
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json(true);
});

app.post("/upload-by-link", async (req, res) => {
  const { link } = req.body;
  const newName = "photo" + Date.now() + ".jpeg";
  await imageDownloader.image({
    url: link,
    dest: __dirname + "/uploads/" + newName,
  });
  res.json(newName);
});

const photosMiddleware = multer({ dest: "uploads" });
app.post("/upload", photosMiddleware.array("photos", 6), (req, res) => {
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i];
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);
    uploadedFiles.push(newPath.replace("uploads/", ""));
  }
  res.json(uploadedFiles);
});

app.put("/campsites", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { token } = req.cookies;
  const {
    id,
    name,
    address,
    addedPhotos,
    description,
    features,
    checkIn,
    checkOut,
    maxGuests,
  } = req.body;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const campsiteDoc = await Campsite.findById(id);
    if (userData.id === campsiteDoc.owner.toString()) {
      campsiteDoc.set({
        name,
        address,
        photos: addedPhotos,
        description,
        features,
        checkIn,
        checkOut,
        maxGuests,
      });
      await campsiteDoc.save();
      res.json("ok");
    }
  });
});

app.post("/campsites", (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { token } = req.cookies;
  const {
    name,
    address,
    addedPhotos,
    description,
    features,
    checkIn,
    checkOut,
    maxGuests,
  } = req.body;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const campsiteDoc = await Campsite.create({
      owner: userData.id,
      name,
      address,
      photos: addedPhotos,
      description,
      features,
      checkIn,
      checkOut,
      maxGuests,
    });
    res.json(campsiteDoc);
  });
});

app.get("/campsites", async (req, res) => {
  const { token } = req.cookies;

  try {
    if (!token) {
      // If no token is provided, proceed without authentication
      const campsites = await Campsite.find();
      return res.json(campsites);
    }

    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) {
        return res.status(403).json({ error: "Token is invalid or expired" });
      }

      // Check if userData is defined and has the id property
      if (!userData || !userData.id) {
        return res.status(403).json({ error: "Invalid token data" });
      }

      // Proceed with finding the campsites for authenticated users
      try {
        const campsites = await Campsite.find({ owner: userData.id });
        res.json(campsites);
      } catch (error) {
        console.error("Error fetching campsites:", error);
        res.status(500).json({ error: "Internal server error" });
      }
    });
  } catch (error) {
    console.error("Error handling /campsites request:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/campsites/:id", async (req, res) => {
  const { id } = req.params;
  res.json(await Campsite.findById(id));
});

app.delete("/campsites/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Find and delete the campsite by ID
    const deletedCampsite = await Campsite.findByIdAndDelete(id);

    if (!deletedCampsite) {
      return res.status(404).json({ error: "Campsite not found" });
    }

    res.json("Campsite deleted successfully");
  } catch (error) {
    console.error("Error deleting campsite:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//app.listen
app.listen(4000);
