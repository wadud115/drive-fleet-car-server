



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

    const bookCarsCollection = db.collection("booking")

    console.log("MongoDB connected successfully");



    

    app.post("/cars", async (req, res) => {
  const carData = req.body;

  console.log(carData);

  const result = await carsCollection.insertOne(carData);

  res.json(result);
});


app.post('/booking' , async(req,res)=>{
  const bookingData = req.body;
  const result = await bookCarsCollection.insertOne(bookingData)
  res.json(result)
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


    app.delete('/cars/:id', async(req,res)=>{
      const {id} = req.params;
      const result = await carsCollection.deleteOne({_id : new ObjectId(id)})
      res.json(result)
    })

    app.patch('/cars/:id' , async(req,res)=>{
      const {id} = req.params;
      const updatedDate = req.body
      const result = await carsCollection.updateOne({_id : new ObjectId(id)}, {$set :  updatedDate})
      res.json(result)
    })

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