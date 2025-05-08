import cors from "cors";
import express from "express";
import path from "path";
import mongoose from 'mongoose'
import { fileURLToPath } from "url";
import userModel from "./models/userModel.js";
import feedbackModel from './models/feedbackModel.js'
import feedback from "./schema/feedbacks.js";
const dbPass = 'codersresources'
const dbName = `tokyo`
// Conexión a MongoDB usando Mongoose
// const mongoURL = 'mongodb+srv://spectre:jZdjJaEAwRoTNMPW@cluster0.5crdf.mongodb.net/codersResources?retryWrites=true&w=majority&appName=Cluster0';
const mongoURL = `mongodb+srv://${dbName}:${dbPass}@cluster0.5crdf.mongodb.net/${dbName}?retryWrites=true&w=majority`;
mongoose.connect(mongoURL)
  .then(() => {
    console.log('Connected to MongoDB via Mongoose');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT || 3001;


app.use(express.json());
app.use(cors({
  origin: ['https://codersresources.vercel.app/', 'http://localhost:3000', 'http://127.0.0.1:5500/'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.static(path.resolve(__dirname, "public")));


app.use((err, _, res, __) => {
  console.error(err.stack);
  res.status(500).send("Something is broke...");
});




app.get('/getUsers/:name', async (req, res) => {
  try {
    const {name} = req.body
    const users = await userModel.find({name});
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
})

app.get('/getUsers', async (req, res) => {  
  try {
    const users = await userModel.find({}, 'name token');
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
})

app.post('/createUser', async (req, res) => {
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
})


app.get('/feedbacks', async (_, res) => {
  try {
    const feedbacks = await feedbackModel.find({}, 'name feedback');
    res.json(feedbacks);
  } catch (error) {
    console.error('Something went wrong while getting the comments:', error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post('/createFeedbacks', async (req, res) => {
  try {
    const {name, feedback, token} = req.body
    const newFeedback = feedbackModel({name, feedback, token})
    newFeedback.save()
    res.send('Feedback Saved!')
  } catch (error) {
    console.log('Something is WRONG!!! ' + error)
    console.warn('PLEASE REPORT TO (Tokyo) sprr_z on discord')
  }
})


app.listen(PORT, () => {
  console.log(`Backend is running ma boy!`);
})

app.use((_, res) => {
  res.status(404).sendFile(path.resolve(__dirname, "public", "404.html"));
});
