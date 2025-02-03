const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Use Local MongoDB URI for Compass
const uri = "mongodb://127.0.0.1:27017/yoga_database"; // Local MongoDB
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.log("MongoDB connection error:", err));

const usersRouter = require("./routes/users.js");
app.use("/", usersRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
