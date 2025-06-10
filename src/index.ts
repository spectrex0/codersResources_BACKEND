import { cors } from "@elysiajs/cors";
import { node } from "@elysiajs/node";
import { swagger } from "@elysiajs/swagger";
import { error, log } from "console";
import { Elysia } from "elysia";
import mongoose from "mongoose";
import { feedbackRoute } from "./routes/feedback/index.js";
import { userRoute } from "./routes/user/index.js";

const dbPass = "codersresources";
const dbName = "tokyo";
const mongoURL = `mongodb+srv://${dbName}:${dbPass}@cluster0.qbhz83b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

mongoose
  .connect(mongoURL)
  .then(() => log("Connected to MongoDB via Mongoose"))
  .catch((err) => error("Error connecting to MongoDB:", err));

// chain of .use order is IMPORTANT!
new Elysia({ adapter: node() })
  .use(
    cors({
      origin: ["https://codersresources.vercel.app"],
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    })
  )
  // for local development
 // .use(cors())

  .use(swagger())
  .get("/", () => "Welcome to Coders Resources Backend")
  .use(feedbackRoute)
  .use(userRoute)
  .listen(4200);

log(`Backend: http://localhost:4200`);
