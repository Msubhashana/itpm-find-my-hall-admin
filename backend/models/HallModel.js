

const mongoose = require('mongoose');

const hallSchema = new mongoose.Schema({
  building: { type: mongoose.Schema.Types.ObjectId, ref: 'Building', required: true },
  floorNumber: { type: Number, required: true },
  hallNumber: { type: String, required: true },     // e.g., "101", "Lab A"
  location: { type: { x: Number, y: Number }, required: true },    // x, y coordinates on the floor map
  hallType: { type: String, enum: ['lab', 'lecture'], required: true }   // Either 'lab' or 'lecture'
}, { timestamps: true });

const Hall = mongoose.model('Hall', hallSchema);

module.exports = Hall;