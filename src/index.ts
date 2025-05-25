import { cors } from "@elysiajs/cors";
import { node } from "@elysiajs/node";
import { swagger } from "@elysiajs/swagger";
import { Elysia } from "elysia";
import mongoose from "mongoose";
import { feedbackRoute } from "./routes/feedback/index.js";
import { userRoute } from "./routes/user/index.js";

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

new Elysia({ adapter: node() })
  .use(
    cors({
      origin: ["https://codersresources.vercel.app"],
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    })
  )
  .use(swagger())
  .get("/", () => "Welcome to Coders Resources Backend")
  .use(feedbackRoute)
  .use(userRoute)
  .listen(4200);

console.log(`Backend: http://localhost:4200`);
