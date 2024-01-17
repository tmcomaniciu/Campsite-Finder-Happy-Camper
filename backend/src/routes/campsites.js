import express from "express";
import Campsite from "../models/campsite.js";

const router = express.Router();

//api/campsites/search
router.get("/search", async (req, res) => {
  try {
    const pageSize = 5;
    const pageNumber = parseInt(
      req.query.page ? req.query.page.toString() : "1"
    );
    const skip = (pageNumber - 1) * pageSize;

    const campsites = await Campsite.find().skip(skip).limit(pageSize);
    const total = await Campsite.countDocuments();

    const response = {
      data: campsites,
      pagination: {
        total,
        page: pageNumber,
        pages: Math.ceil(total / pageSize),
      },
    };

    res.json(response);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Something went wrong(campsites.js)" });
  }
});

export default router;
