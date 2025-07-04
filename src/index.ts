import { cors } from "@elysiajs/cors";
import { node } from "@elysiajs/node";
import { swagger } from "@elysiajs/swagger";
import { error, log } from "console";
import { Elysia } from "elysia";
import mongoose from "mongoose";
import { feedbackRoute } from "./routes/feedback/index.js";
import { userRoute } from "./routes/user/index.js";
import { scrapper } from "./routes/theLux/scrapper.js";
import dotenv from "dotenv";
dotenv.config();
const dbPass = process.env.dbPass;
const dbName = process.env.dbName;
const mongoURL = `mongodb+srv://${dbName}:${dbPass}@cluster0.qbhz83b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

mongoose
  .connect(mongoURL)
  .then(() => log("Connected to MongoDB via Mongoose"))
  .catch((err) => error("Error connecting to MongoDB:", err));

new Elysia({ adapter: node() })
  .use(
    cors({
      origin: ["https://codersresources.vercel.app", "https://isolated-emili-spectredev-9a803c60.koyeb.app/api/api"],
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    })
  )
  //.use(cors())

  .use(swagger())
  .get("/", () => "Welcome to Coders Resources Backend")
  .use(feedbackRoute)
  .use(userRoute)
  .use(scrapper)
  .listen(4200);

log(`[✔] Backend: http://localhost:4200`);
