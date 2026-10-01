



const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const cors = require("cors");
const { createRemoteJWKSet, jwtVerify } = require("jose-cjs");

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri);



const JWKS = createRemoteJWKSet(
  new URL(`${process.env.CLIENT_URL}/api/auth/jwks`)
)



const verifyToken = async(req,res,next)=>{
  const header = req.headers.authorization;
  console.log(header)
  if(!header){
    return res.status(401).json({massage:"Unauthorized"})
  }

  const token = header.split(" ")[1]
  console.log(token)

  if(!token){
    return res.status(401).json({massage: "Unauthorized"})
  }

 try{
const {payload} = await jwtVerify(token,JWKS)
  console.log(payload)
  next()
 


}catch(error){

  return res.status(403).json({massage:"Forbidden"})

 }
 
}

async function run() {
  try {
    // await client.connect();

    const db = client.db("car-rent");
    const carsCollection = db.collection("cars");

    const bookCarsCollection = db.collection("booking")

    console.log("MongoDB connected successfully");



    

    app.post("/cars", verifyToken, async (req, res) => {
  const carData = req.body;

  console.log(carData);

  const result = await carsCollection.insertOne(carData);

  res.json(result);
});

app.get("/my-cars/:userId", verifyToken, async (req, res) => {
  const { userId } = req.params;

  const result = await carsCollection
    .find({ userId: userId })
    .toArray();

  res.json(result);
});


app.post("/booking" , async(req,res)=>{
  const bookingData = req.body;
  const result = await bookCarsCollection.insertOne(bookingData)
  res.json(result)
});



  app.get("/booking/:userId" , verifyToken, async (req, res) => {
    const {userId} = req.params;
  const result = await bookCarsCollection.find({userId: userId}).toArray();

  res.json(result);
});


      app.post("/booking", async (req, res) => {
  const bookingData = req.body;

  const result = await bookCarsCollection.insertOne(bookingData);

  res.json(result);
});


// get all card
 app.get("/cars", async (req, res) => {
  const { search, type } = req.query;

  let query = {};

  if (search) {
    query.name = {
      $regex: search,
      $options: "i",
    };
  }

  if (type) {
    query.type = type;
  }

  const result = await carsCollection.find(query).toArray();

  res.json(result);
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


    app.patch("/cars/:id/booking-count", async (req, res) => {
  const { id } = req.params;

  const result = await carsCollection.updateOne(
    {
      _id: new ObjectId(id),
    },
    {
      $inc: {
        booking_count: 1,
      },
    }
  );

  res.json(result);
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