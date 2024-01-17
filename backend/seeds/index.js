const mongoose = require("mongoose");
const Camp = require("../Models/Camp");

main().catch((error) => {
  console.log("Error connecting to MongoDB");
  console.log(error);
});
async function main() {
  console.log(process.env.MONGO_URI);
  await mongoose.connect(
    "mongodb+srv://admin:password-group-4@mern-campsite-reservati.dg4wdlm.mongodb.net/?retryWrites=true&w=majority/camps"
  );
  console.log("Connected to MongoDB");
}
const cities = [
  {
    name: "Forest Camp",
    city: "New York",
    latitude: 40.7127837,
    longitude: -74.0059413,
    state: "New York",
  },
  {
    name: "Redwood Camp",
    city: "Los Angeles",
    latitude: 34.0522342,
    longitude: -118.2436849,
    state: "California",
  },
  {
    name: "Misty Camp",
    city: "Chicago",
    latitude: 41.8781136,
    longitude: -87.6297982,
    state: "Illinois",
  },
  {
    name: "Sky Gazer Camp",
    city: "Houston",
    latitude: 29.7604267,
    longitude: -95.3698028,
    state: "Texas",
  },
  {
    name: "Ghost Town",
    city: "Philadelphia",
    latitude: 39.9525839,
    longitude: -75.1652215,
    state: "Pennsylvania",
  },
  {
    name: "River Creek Camp",
    city: "Phoenix",
    latitude: 33.4483771,
    longitude: -112.0740373,
    state: "Arizona",
  },
  {
    name: "Sand Dunes",
    city: "San Antonio",
    latitude: 29.4241219,
    longitude: -98.49362819999999,
    state: "Texas",
  },
  {
    name: "Bayshore Camp",
    city: "San Diego",
    latitude: 32.715738,
    longitude: -117.1610838,
    state: "California",
  },
  {
    name: "Horse Camp",
    city: "Dallas",
    latitude: 32.7766642,
    longitude: -96.79698789999999,
    state: "Texas",
  },
  {
    name: "Spring Camp",
    city: "San Jose",
    latitude: 37.3382082,
    longitude: -121.8863286,
    state: "California",
  },
];
const seedDB = async () => {
  await Camp.deleteMany({});

<<<<<<< HEAD
  for (let i = 0; i < 10; i++) {
    const price = Math.floor(Math.random() * 50) + 10;
    const camp = new Camp({
      name: cities[i].name,
      city: cities[i].city,
      state: cities[i].state,
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. A incidunt aliquid in, molestias fugit rem quidem eum eaque illum, harum soluta nisi beatae repellendus amet distinctio praesentium obcaecati eius corrupti.",
      imageURL: `https://images.pexels.com/photos/8985295/pexels-photo-8985295.jpeg?auto=compress&cs=tinysrgb&w=600`,
      price,
      geolocation: {
        type: "Point",
        coordinates: [cities[i].longitude, cities[i].latitude],
      },
    });
    await camp.save();
  }
};
=======
    for (let i = 0; i < cities.length; i++) {
        const price = Math.floor(Math.random() * 50) + 10;
        const camp = new Camp({
            name: cities[i].name,
            city: cities[i].city,
            state: cities[i].state,
            description: 'Camping is a fun and exciting outdoor activity that allows you to connect with nature. It is when you leave your home and stay outside for one or more nights, usually in a tent or a camper. The best part about it is that you can do it anywhere from a forest to a mountain top.',
            imageURL: `https://images.pexels.com/photos/8985295/pexels-photo-8985295.jpeg?auto=compress&cs=tinysrgb&w=600`,
            price,
            geolocation: {
                type: 'Point', 
                coordinates: [ 
                    cities[i].longitude,
                    cities[i].latitude
                 ] 
            }
        })
        await camp.save()
    }
}
>>>>>>> ef0e421272bbc33aa046bbffef10f5bc3439f711
seedDB().then(() => {
  mongoose.connection.close();
  console.log("connection closed");
});
