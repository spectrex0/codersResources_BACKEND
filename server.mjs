import cors from "cors";
import express from "express";
import path from "path";
import mongoose from 'mongoose';
import { fileURLToPath } from "url";
import userRoutes from './routes/users.js';
import feedbackRoutes from './routes/feedbacks.js';

const dbPass = 'codersresources';
const dbName = `tokyo`;
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
  origin: ['https://codersresources.vercel.app/', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.static(path.resolve(__dirname, "public")));

// routes
app.use('/users', userRoutes);
app.use('/feedbacks', feedbackRoutes);

app.use((err, _, res, __) => {
  console.error(err.stack);
  res.status(500).send("Something is broke...");
});

app.listen(PORT, () => {
  console.log(`Backend is running ma boy!`);
});

app.use((_, res) => {
  res.status(404).sendFile(path.resolve(__dirname, "public", "404.html"));
});
