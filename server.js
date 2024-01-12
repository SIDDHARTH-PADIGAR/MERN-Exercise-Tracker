const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;

// Use an async function to handle the database connection
async function connectToDatabase() {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
    });
    console.log("MongoDB database connection established successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

connectToDatabase(); // Call the async function to connect to the database

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exercisesRouter);//To use these files when they type in /exercises
app.use('/users', usersRouter);//same with /users will load everything in the users router

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
