const express = require("express");
const volleyball = require("volleyball");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
// Import Routes
const authRoute = require("./routes/auth");
const animalsRoute = require("./routes/Animals");
const usersRoute = require("./routes/Users");

dotenv.config();

// Connect to Mongoose
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () =>
  console.log("Connected to Mongoose")
);

// Middleware
app.use(volleyball);
app.use(cors());
app.use(express.json());
// Route Middlewares
app.use("/api/user", authRoute);
app.use("/api/animals", animalsRoute);
app.use("/api/users", usersRoute);

app.listen(process.env.PORT, () =>
  console.log("Express service up and running")
);
