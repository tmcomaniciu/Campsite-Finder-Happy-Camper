const mongoose = require("mongoose");
const Camp = require("../Models/Camp");

main().catch((error) => {
  console.log("Error connecting to MongoDB");
  console.log(error);
});
async function main() {
  console.log(process.env.MONGO_URI);
  await mongoose.connect("mongodb://localhost:27017/campsites");
  console.log("Connected to MongoDB");
}

const seedDB = async () => {
  await Camp.deleteMany({});

  for (let i = 0; i < 10; i++) {
    const camp = new Camp({
      name: `test${i}`,
      location: `test${i}`,
      description: `test${i}`,
      imageURL: `https://images.pexels.com/photos/8985295/pexels-photo-8985295.jpeg?auto=compress&cs=tinysrgb&w=600`,
      price: 99,
    });
    await camp.save();
  }
};
seedDB().then(() => {
  mongoose.connection.close();
  console.log("connection closed");
});
