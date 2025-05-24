import cors from "@elysiajs/cors";
import { Elysia } from "elysia";
import mongoose from "mongoose";
import FeedbackR from "../routes/feedback";
import userR from "../routes/user";
const dbPass = "codersresources";
const dbName = "tokyo";
const mongoURL = `mongodb+srv://${dbName}:${dbPass}@cluster0.qbhz83b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;


mongoose
  .connect(mongoURL)
  .then(() => {
    console.log("Connected to MongoDB via Mongoose");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
const app = new Elysia()
  .get("/", () => "Welcome to Coders Resoureces Backend")
  .listen(1000);
app.use(cors());
app.use(FeedbackR);
app.use(userR);

app.use(cors({
  origin: ['https://codersresources.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
console.log(` Backend: ${app.server?.hostname}:${app.server?.port}`);
