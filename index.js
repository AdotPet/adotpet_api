const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
// Import Routes
const authRoute = require("./routes/auth");
const animalsRoute = require("./routes/Animals");

dotenv.config();

// Connect to Mongoose
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () =>
  console.log("Connected to Mongoose")
);

// Middleware
app.use(express.json());
// Route Middlewares
app.use("/api/user", authRoute);
app.use("/api/animals", animalsRoute);

app.listen(3000, () => console.log("Express service up and running"));
