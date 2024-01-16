import express from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import Campsite from "../models/campsite.js";
import verifyToken from "../middleware/auth.js";
import { body } from "express-validator";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

router.post(
  "/",
  verifyToken,
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("city").notEmpty().withMessage("City is required"),
    body("state").notEmpty().withMessage("State is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("type").notEmpty().withMessage("Hotel type is required"),
    body("pricePerNight")
      .notEmpty()
      .isNumeric()
      .withMessage("Price per night is required and must be a number"),
    body("facilities")
      .notEmpty()
      .isArray()
      .withMessage("Facilities are required"),
  ],
  upload.array("imageFiles", 6),
  async (req, res) => {
    try {
      const imageFiles = req.files;
      const newCampsite = req.body;

      const imageUrls = await uploadImages(imageFiles);

      newCampsite.imageUrls = imageUrls;
      newCampsite.lastUpdated = new Date();
      newCampsite.userId = req.userId;

      const campsite = new Campsite(newCampsite);
      await campsite.save();

      res.status(201).send(campsite);
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

async function uploadImages(imageFiles) {
  const uploadPromises = imageFiles.map(async (image) => {
    const b64 = Buffer.from(image.buffer).toString("base64");
    let dataURI = "data:" + image.mimetype + ";base64," + b64;
    const res = await cloudinary.v2.uploader.upload(dataURI);
    return res.url;
  });

  const imageUrls = await Promise.all(uploadPromises);
  return imageUrls;
}

export default router;

// const router = express.Router();

// const storage = multer.memoryStorage();
// const upload = multer({
//   storage: storage,
//   limit: {
//     fileSize: 5 * 1024 * 1024, //5MB max size
//   },
// });

// router.post(
//   "/",
//   verifyToken,
//   [
//     //check if fields are valid
//     body("name").notEmpty().withMessage("Name is required"),
//     body("city").notEmpty().withMessage("City is required"),
//     body("state").notEmpty().withMessage("State is required"),
//     body("description").notEmpty().withMessage("Description is required"),
//     body("type").notEmpty().withMessage("Type is required"),
//     body("pricePerNight")
//       .notEmpty()
//       .isNumeric()
//       .withMessage("Price per night is required and must be a number"),
//     body("facilities")
//       .notEmpty()
//       .isArray()
//       .withMessage("Facilities are required"),
//   ],
//   upload.array("imageFiles", 6),
//   async (req, res) => {
//     try {
//       const imageFiles = req.files;
//       const newCampsite = req.body;

//       //upload images to cloudinary, encode image as base-64 string, //string describes image type, //upload to cloudinary, synchronously
//       const uploadPromise = imageFiles.map(async (image) => {
//         try {
//           const b64 = Buffer.from(image.buffer).toString("base64");
//           let dataURI = "data:" + image.mimetype + ";base64," + b64;
//           const res = await cloudinary.v2.uploader.upload(dataURI);
//           return res.url;
//         } catch (uploadError) {
//           console.error("Cloudinary Upload Error:", uploadError);
//           throw uploadError;
//         }
//       });

//       //if upload is succesfull, add image URLs to new campsite, //attached cookie to request, validates auth_token
//       const imageUrls = await Promise.all(uploadPromise);
//       newCampsite.imageURLs = imageUrls;
//       newCampsite.lastUpdated = new Date();
//       newCampsite.userId = req.userId;

//       //add campsite to DB
//       const campsite = new Campsite(newCampsite);
//       await campsite.save();

//       res.status(201).send(campsite);
//     } catch (e) {
//       console.error("Database or Cloudinary Error:", e);
//       res.status(500).json({
//         message: "Something went wrong (campsite.js)",
//         error: e.message,
//       });
//     }
//   }
// );

// export default router;
