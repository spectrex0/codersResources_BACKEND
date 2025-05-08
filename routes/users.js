import express from 'express';
import userModel from '../models/userModel.js';

const router = express.Router();

router.get('/getUsers/:name', async (req, res) => {
  try {
    const { name } = req.body;
    const users = await userModel.find({ name });
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get('/getUsers', async (req, res) => {
  try {
    const users = await userModel.find({}, 'name token');
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post('/createUser', async (req, res) => {
  try {
    const { name, token } = req.body;

    const existingUser = await userModel.findOne({ name });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const newUser = new userModel({ name, token });
    await newUser.save();
    res.send('USER CREATED: ' + name);
  } catch (error) {
    console.error('Something is wrong... please report the issue:', error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;