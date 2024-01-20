import mongoose from 'mongoose'

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
    imageURLs: [{
        type: String, required: false
    }],
    price: {
        type: Number, required: true
    },
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectID,
            ref: 'Review'
        }
    ],
    // userId:
    // {
    //     type: mongoose.Schema.Types.ObjectID,
    //     ref: 'User'
    // }

})

const Camp = mongoose.model('Camp', CampSchema)
export default Camp 
