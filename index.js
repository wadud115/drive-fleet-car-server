const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();

    const db = client.db("car-rent");
    const carsCollection = db.collection("cars");

    console.log("MongoDB connected successfully");


    // app.post("/cars" , async(req,res)=>{

    //     const carData = req.body;
    //     console.log(carData)
    //     const result = await carsCollection.insertOne(carData)
    //     res.json(result)
    // })
    

    app.post("/cars", async (req, res) => {
  const carData = req.body;

  console.log(carData);

  const result = await carsCollection.insertOne(carData);

  res.json(result);
});


// get all card
    app.get("/cars", async (req, res) => {
      const result = await carsCollection.find().toArray();

      res.send(result);
    });

    // get single card

    app.get('/cars/:id' , async(req,res)=>{
        const {id} = req.params;

        const result = await carsCollection.findOne({_id : new ObjectId(id)})
        res.json(result)
    } )

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