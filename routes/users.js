const router = require('express').Router();
const User = require('../models/users.model'); // Correct the path if needed

// First Route that handles get requests
router.route('/').get(async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

// Second Route that handles post requests
router.route('/add').post(async (req, res) => {
  const username = req.body.username;

  const newUser = new User({ username });

  try {
    await newUser.save();
    res.json('User added!');
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

module.exports = router;
