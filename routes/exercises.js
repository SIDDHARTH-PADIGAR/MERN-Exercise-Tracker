const router = require('express').Router(); // Requiring our router
const Exercise = require('../models/exercise.model'); // Requiring our model that we created

// Exercises will be pulled out from the database and returned as JSON
router.route('/').get(async (req, res) => {
  try {
    const exercises = await Exercise.find();
    res.json(exercises);
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

// If we have exercises/add and it is a POST request
router.route('/add').post(async (req, res) => {
  const { username, description, duration, date } = req.body;

  // Create a new exercise using the provided variables
  const newExercise = new Exercise({
    username,
    description,
    duration: Number(duration), // Converting duration to a number
    date: Date.parse(date), // Converting date to a date datatype
  });

  try {
    // Then the exercise is saved
    await newExercise.save();
    res.json('Exercise added!');
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

//User will be able to search for specific exercises using the object id
router.route('/:id').get(async (req, res) => {
    try {
      const exercise = await Exercise.findById(req.params.id);
      if (!exercise) {
        return res.status(404).json('Exercise not found'); // Handle not found case
      }
      res.json(exercise);
    } catch (err) {
      res.status(400).json('Error' + err); // Handle other errors
    }
  });

  //Users can search up specific exercises and delete them using the object id
  router.route('/:id').delete(async (req, res) => {
    try {
      const deletedExercise = await Exercise.findByIdAndDelete(req.params.id);
      if (!deletedExercise) {
        return res.status(404).json('Exercise not found'); // Handle not found case
      }
      res.json('Exercise deleted.');
    } catch (err) {
      res.status(400).json('Error' + err); // Handle other errors
    }
  });
  
  router.route('/update/:id').post(async (req, res) => {
    try {
      const exercise = await Exercise.findById(req.params.id);
  
      if (!exercise) {
        return res.status(404).json('Exercise not found'); // Handle not found case
      }
  
      exercise.username = req.body.username;
      exercise.description = req.body.description;
      exercise.duration = Number(req.body.duration);
      exercise.date = Date.parse(req.body.date);
  
      await exercise.save();
      res.json('Exercise updated!');
    } catch (err) {
      res.status(400).json('Error' + err); // Handle other errors
    }
  });


module.exports = router;
