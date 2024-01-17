const mongoose = require('mongoose')

const CampSchema = new mongoose.Schema({
    name: {
        type: String, required: true
    },
    city: {
        type: String, required: true
    },
    state: {
        type: String, required: true
    },
    geolocation: {
        type: {
            type: String,
            enum: ['Point'],
            required: false
        },
        coordinates: {
            type: [Number],
            required: false
        }
    },
    description: {
        type: String, required: true
    },
    imageURL: {
        type: String, required: false
    },
    price: {
        type: Number, required: true
    },
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectID,
            ref: 'Review'
        }
    ]
})

const Camp = mongoose.model('Camp', CampSchema)
module.exports = Camp 
