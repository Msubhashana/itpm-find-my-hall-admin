// routes/buildingRoutes.js.

const express = require('express');
const router = express.Router();
const Building = require('../models/BuildingModel');

// Route to create a new building
router.post('/', async (req, res) => {
  const { name, numFloors, buildingImage } = req.body;

  try {
    const newBuilding = new Building({ name, numFloors, buildingImage });
    await newBuilding.save();
    res.status(201).json(newBuilding);
  } catch (err) {
    res.status(400).json({ message: 'Error creating building', error: err });
  }
});

// Route to fetch all buildings
router.get('/', async (req, res) => {
  try {
    const buildings = await Building.find();
    res.json(buildings);
  } catch (err) {
    res.status(400).json({ message: 'Error fetching buildings', error: err });
  }
});

module.exports = router;