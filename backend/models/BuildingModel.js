// models/BuildingModel.js

const mongoose = require('mongoose');

const buildingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  numFloors: { type: Number, required: true },
  buildingImage: String, // URL to the building image
  floors: [                // Array to store floor numbers
    { floorNumber: Number, floorMapImage: String }  // Store floor number and corresponding image
  ],
}, { timestamps: true });

const Building = mongoose.model('Building', buildingSchema);

module.exports = Building;