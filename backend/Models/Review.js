const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ReviewSchema = new Schema({
    body: String,
    rating: String
})

module.exports = mongose.model('Review', ReviewSchema)