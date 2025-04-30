const express = require('express');
const router = express.Router();
const Hall = require('../models/HallModel');
const Building = require('../models/BuildingModel');  // Import the Building model

// Route to add a hall to a floor
router.post('/add', async (req, res) => {
  const { buildingId, floorNumber, hallNumber, location, hallType} = req.body;

  try {
    const building = await Building.findById(buildingId);

    // Ensure the building and floor exist
    if (!building) {
      return res.status(400).json({ message: 'Building not found' });
    }
    if (floorNumber > building.numFloors || floorNumber < 1) {
      return res.status(400).json({ message: 'Invalid floor number' });
    }

    // Create a new  hall 
    const newHall = new Hall({
      building: buildingId,
      floorNumber,
      hallNumber,
      location,
      hallType,
    });

    await newHall.save();
    res.status(201).json(newHall);
  } catch (err) {
    res.status(400).json({ message: 'Error adding hall', error: err });
  }
});

// Route to fetch all halls for a building
router.get('/:buildingId/halls', async (req, res) => {
  const { buildingId } = req.params;

  try {
    const halls = await Hall.find({ building: buildingId });

    // Map through halls to include hallType in the response
    const hallDetails = halls.map(hall => ({
        hallNumber: hall.hallNumber,
        floorNumber: hall.floorNumber,
        hallType: hall.hallType,
        location: hall.location,
    }));

    res.json(halls);
  } catch (err) {
    res.status(400).json({ message: 'Error fetching halls', error: err });
  }
});

module.exports = router;