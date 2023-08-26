if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 200; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 30) + 10;
    const camp = new Campground({
      author: "64e991541331e85250e4dcbc",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)} `,
      description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur illum vel hic provident ut. Ab magni nostrum totam ducimus possimus dolores mollitia voluptates voluptate! Perferendis dolorum maxime provident esse praesentium.",
      price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url: "https://res.cloudinary.com/dqjfgnf0m/image/upload/v1693027913/Yelp-Camp/ruyoaxgf72nzpi4y6cdi_qwetih.png",
          filename: "Yelp-Camp/ruyoaxgf72nzpi4y6cdi_qwetih",
        },
        {
          url: "https://res.cloudinary.com/dqjfgnf0m/image/upload/v1693027913/Yelp-Camp/ahfnenvca4tha00h2ubt_pgv0qz.png",
          filename: "Yelp-Camp/ahfnenvca4tha00h2ubt_pgv0qz",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
