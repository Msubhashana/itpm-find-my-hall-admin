// server.js

const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();  // Loads the .env file
const userRoutes = require('./routes/userRoutes');  // Import user routes
const buildingRoutes = require('./routes/buildingRoutes'); // Import the building routes
const floorMapRoutes = require('./routes/floorMapRoutes'); // Import floor map routes
const hallRoutes = require('./routes/hallRoutes'); // Import hall routes
const announcementRoutes = require('./routes/announcementRoutes'); // Announcements
const cors = require('cors');

// Initialize express app
const app = express();
app.use(express.json()); // Middleware to parse incoming JSON requests
app.use(cors());  // Enable Cross-Origin Request Sharing (CORS)

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Successfully connected to MongoDB'))
  .catch((err) => console.log('Error connecting to MongoDB:', err));

// Use routes
app.use('/api/users', userRoutes);  // Routes for user management
app.use('/api/buildings', buildingRoutes); // Use building routes for '/api/buildings'
app.use('/api/floors', floorMapRoutes); // Use floor map routes
app.use('/api/halls', hallRoutes);  // Use hall routes
app.use('/api/announcements', announcementRoutes);  // Announcements

// Example route to test connection
app.get('/', (req, res) => {
  res.send('Admin Panel Backend is Running');
});

// Remove the /test endpoint if no longer needed

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
