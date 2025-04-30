const express = require('express');
const User = require('../models/UserModel');
const router = express.Router();

// POST: Register a new user
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = new User({ name, email, password });

    const user = await newUser.save();
    res.status(201).json(user);  // Return the created user
  } catch (error) {
    res.status(400).json({ message: 'Error registering user', error: error.message });
  }
});

// PUT: Update existing user details
router.put('/:id', async (req, res) => {
  const { name, email } = req.body; // Get name and email from request body
  try {
    const user = await User.findById(req.params.id);  // Find user by ID

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user fields
    user.name = name || user.name;
    user.email = email || user.email;

    const updatedUser = await user.save();  // Save updated user details
    res.status(200).json(updatedUser);  // Return updated user
  } catch (error) {
    res.status(400).json({ message: 'Error updating user', error: error.message });
  }
});

// GET: Fetch a user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);  // Find user by ID

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);  // Return the found user
  } catch (error) {
    res.status(400).json({ message: 'Error fetching user', error: error.message });
  }
});

// DELETE: Remove a user by ID
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id); // Delete user by ID

    if (!user) {
      return res.status(404).json({ message: 'User not found' }); // If user doesn't exist
    }

    res.status(200).json({ message: 'User deleted successfully', user }); // Return success message
  } catch (error) {
    res.status(400).json({ message: 'Error deleting user', error: error.message }); // Return error message
  }
});

// GET: Fetch all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();  // Fetch all users from the database
    res.status(200).json(users);  // Return all users
  } catch (error) {
    res.status(400).json({ message: 'Error fetching users', error: error.message });
  }
});

module.exports = router;
