# 🚗 DriveFleet Server

Backend server for **DriveFleet**, a full-stack car rental web application built with **Node.js, Express.js, MongoDB, and Better Auth**.

The server provides REST APIs for car management, bookings, authentication, and user-specific data.

---

## 🚀 Live Server

**Server URL:**
https://drive-fleet-car-server-psi.vercel.app/



---

## 🛠️ Technologies Used

* Node.js
* Express.js
* MongoDB
* Better Auth
* JWT
* dotenv
* CORS
* Vercel

---

## 📁 Project Structure

```text
drive-fleet-car-server/
│
├── index.js
├── package.json
├── .env
├── .gitignore
└── README.md
```

---

## ⚙️ Installation

Clone the repository:

```bash
git clone https://github.com/wadud115/drive-fleet-car-server.git
```

Go to the project folder:

```bash
cd drive-fleet-car-server
```

Install dependencies:

```bash
npm install
```

---

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

BETTER_AUTH_SECRET=your_better_auth_secret
BETTER_AUTH_URL=http://localhost:3000

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

For production, update:

```env
BETTER_AUTH_URL=https://your-frontend-url.vercel.app
```

> Never commit your `.env` file to GitHub.

---

## ▶️ Run the Server

Start the development server:

```bash
node index.js
```

The server will run on:

```text
http://localhost:5000
```

---

## 📡 API Endpoints

### 🚘 Cars

#### Get all cars

```http
GET /cars
```

Returns all available cars from the database.

#### Get a single car

```http
GET /cars/:id
```

Returns details of a specific car.

#### Add a car

```http
POST /cars
```

Adds a new car to the database.

Example:

```json
{
  "name": "BMW M4",
  "price": 150,
  "seat": 4,
  "type": "Luxury",
  "availability": "Available",
  "imageUrl": "https://example.com/car.jpg",
  "pickupLocation": "Sylhet",
  "description": "A premium luxury car for comfortable travel."
}
```

---

### 📅 Booking

#### Create booking

```http
POST /booking
```

Creates a new car booking.

Booking data can include:

```json
{
  "carId": "car_id",
  "carName": "BMW M4",
  "userId": "user_id",
  "userName": "User Name",
  "date": "2026-10-10",
  "driverNeeded": "Yes",
  "specialNote": "Please provide an experienced driver."
}
```

#### Get user bookings

```http
GET /booking/:userId
```

Returns bookings belonging to a specific user.

---

## 📊 Booking Count

When a car is booked, the server updates the car's booking count using MongoDB's `$inc` operator.

Example:

```js
await carsCollection.updateOne(
  { _id: new ObjectId(carId) },
  {
    $inc: {
      booking_count: 1
    }
  }
);
```

---

## 🗄️ MongoDB Collections

The project uses the following collections:

```text
car-rent
│
├── cars
├── booking
├── user
├── session
└── account
```

Better Auth manages authentication-related collections.

---

## 🔑 Authentication

DriveFleet uses **Better Auth** for authentication.

Supported authentication methods:

* Email & Password
* Google Authentication
* JWT session
* MongoDB session storage

Authentication is used to protect private features such as:

* My Bookings
* My Added Cars
* Add Car

---

## 🌐 CORS

The Express server allows requests from the DriveFleet frontend.

For production, configure CORS with your deployed frontend URL instead of relying only on localhost.

Example:

```js
app.use(
  cors({
    origin: "https://your-frontend-url.vercel.app",
    credentials: true,
  })
);
```

---

## 🚀 Deployment

The backend can be deployed using **Vercel**.

Login to Vercel:

```bash
vercel login
```

Deploy:

```bash
vercel
```

For production deployment:

```bash
vercel --prod
```

After deployment, use the generated server URL in the frontend environment variable:

```env
NEXT_PUBLIC_API_URL=https://your-server-url.vercel.app
```

---

## 🔒 Security

* Environment variables are kept private.
* MongoDB credentials are not committed to GitHub.
* Authentication is handled with Better Auth.
* Protected user data is filtered using the authenticated user's ID.
* Production frontend and backend URLs should be configured separately.

---

## 👨‍💻 Developer

**Akramul Wadud**

Aspiring Full Stack Web Developer

### Skills

* JavaScript
* React.js
* Next.js
* Node.js
* Express.js
* MongoDB
* REST API
* Git & GitHub

---

## 🔗 DriveFleet

**Frontend:**
https://drive-fleet-car.vercel.app/

**Backend:**
https://drive-fleet-car-server-psi.vercel.app

**GitHub:**
https://github.com/wadud115

---

⭐ If you find this project useful, feel free to explore the repository and give it a star.
