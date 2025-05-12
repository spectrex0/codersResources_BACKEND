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
    console.warn('PLEASE REPORT TO (Tokyo) dev0_tokyo on discord');
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post('/deleteFeedback', async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ error: "ID is required" });
    }

    const deletedFeedback = await feedbackModel.findByIdAndDelete(id);
    if (!deletedFeedback) {
      return res.status(404).json({ error: "Feedback not found" });
    }

    res.json({ message: "Feedback deleted successfully" });
  } catch (error) {
    console.log('Something went wrong....' + error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;