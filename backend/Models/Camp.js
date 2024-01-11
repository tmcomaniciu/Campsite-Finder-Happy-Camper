const mongoose = require('mongoose')

const CampSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    imageURL: { type: String, required: false },
    price: { type: Number, required: true }
})

module.exports = mongoose.model('Camp', CampSchema)
