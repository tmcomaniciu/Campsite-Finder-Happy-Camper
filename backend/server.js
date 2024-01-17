require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const campRoutes = require('./Controllers/camp_controllers')

const PORT = process.env.PORT || 8000
const MONGO_URI = process.env.MONGO_URI

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use('/camps', campRoutes)

app.get('/', (req, res) => {
  res.send('Welcome to Camping....')
})

mongoose

  .connect(MONGO_URI)

  .then(() => console.log("MongoDB connected"))

  .catch((err) => console.error("MongoDB connection error:", err));

app.listen(PORT, () => {
  console.log('listening on port', PORT);
})