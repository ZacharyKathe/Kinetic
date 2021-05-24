const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const logger = require("morgan");
// const cors = require("cors")
const db = require("./models");
// const { getMaxListeners } = require("./models/User");

const PORT = process.env.PORT || 3003;

const app = express();

app.use(logger("dev"));

app.use('/api', router);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// app.use(cors());

// Sample user document
db.User.create({
  username: 'tylercmac',
  password: 'password',
  email: 'tylercmac@gmail.com'
})

// MAKE SURE YOU CREATE A 'stonkmarket' DB IN YOUR LOCAL MONGO DB FIRST 
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/stonkmarket", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const connection = mongoose.connection;

connection.once("open", function () {
  console.log("Connection with MongoDB was successful");
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});