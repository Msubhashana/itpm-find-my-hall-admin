
const express = require('express');
const router = express.Router();
const Announcement = require('../models/AnnouncementModel');

// Create an announcement
router.post('/', async (req, res) => {
  const { title, message } = req.body;

  try {
    const announcement = new Announcement({ title, message });
    await announcement.save();
    res.status(201).json(announcement);
  } catch (err) {
    res.status(400).json({ message: 'Error creating announcement', error: err });
  }
});

// Get all announcements
router.get('/', async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ date: -1 }); // latest first
    res.json(announcements);
  } catch (err) {
    res.status(400).json({ message: 'Error fetching announcements', error: err });
  }
});

// Update an announcement
router.put('/:id', async (req, res) => {
  const { title, message } = req.body;

  try {
    const updated = await Announcement.findByIdAndUpdate(
      req.params.id,
      { title, message },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: 'Error updating announcement', error: err });
  }
});

// Delete an announcement
router.delete('/:id', async (req, res) => {
  try {
    await Announcement.findByIdAndDelete(req.params.id);
    res.json({ message: 'Announcement deleted' });
  } catch (err) {
    res.status(400).json({ message: 'Error deleting announcement', error: err });
  }
});

module.exports = router;