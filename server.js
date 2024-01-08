require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')

const PORT = process.env.PORT
const MONGO_URI = process.env.MONGO_URI


const start = async () => {
    try {
        mongoose.connect(MONGO_URI)
        console.log('Connected to MongoDb');
    } catch (e) {
        console.log('MongoDb not connected');
    }
}

start()

app.listen(PORT, () => {
    console.log('listening on port', PORT);
})