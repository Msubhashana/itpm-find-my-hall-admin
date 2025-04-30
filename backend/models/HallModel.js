

const mongoose = require('mongoose');

const hallSchema = new mongoose.Schema({
  building: { type: mongoose.Schema.Types.ObjectId, ref: 'Building', required: true },
  floorNumber: { type: Number, required: true },
  hallNumber: { type: String, required: true },     
  location: { type: { x: Number, y: Number }, required: true },   
  hallType: { type: String, enum: ['lab', 'lecture'], required: true }   
}, { timestamps: true });

const Hall = mongoose.model('Hall', hallSchema);

module.exports = Hall;