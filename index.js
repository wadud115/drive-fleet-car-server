const express = require("express");
const { MongoClient } = require("mongodb");
require("dotenv").config();

const app = express();

app.use(express.json());

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();

    const db = client.db("car-rent");
    const carsCollection = db.collection("cars");

    console.log("MongoDB connected successfully");

    app.get("/cars", async (req, res) => {
      const result = await carsCollection.find().toArray();

      res.send(result);
    });

  } catch (error) {
    console.log(error);
  }
}

run();

app.get("/", (req, res) => {
  res.send("Car Rental Server is Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});