import express from 'express';
import feedbackModel from '../models/feedbackModel.js';

const router = express.Router();

router.get('/feedbacks', async (_, res) => {
  try {
    const feedbacks = await feedbackModel.find({}, 'name feedback');
    res.json(feedbacks);
  } catch (error) {
    console.error('Something went wrong while getting the comments:', error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post('/createFeedbacks', async (req, res) => {
  try {
    const { name, feedback, token } = req.body;
    const newFeedback = feedbackModel({ name, feedback, token });
    await newFeedback.save();
    res.send('Feedback Saved!');
  } catch (error) {
    console.log('Something is WRONG!!! ' + error);
    console.warn('PLEASE REPORT TO (Tokyo) sprr_z on discord');
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;