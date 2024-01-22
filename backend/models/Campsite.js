const mongoose = require("mongoose");

const campsiteSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: String,
  address: String,
  photos: [String],
  description: String,
  features: [String],
  checkIn: Number,
  checkOut: Number,
  maxGuests: Number,
});

const campsiteModel = mongoose.model("Campsite", campsiteSchema);

module.exports = campsiteModel;
