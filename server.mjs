import cors from "cors";
import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT || 3001;
const dataDir = path.resolve(__dirname, "data");
const feedbacksFile = path.resolve(dataDir, "feedbacks.json");
const usersFile = path.resolve(dataDir, "users.json");

// Ensure data directory exists
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Initialize feedbacks file if it doesn't exist
if (!fs.existsSync(feedbacksFile)) {
  fs.writeFileSync(feedbacksFile, JSON.stringify([]));
}

// Initialize users file if it doesn't exist
if (!fs.existsSync(usersFile)) {
  fs.writeFileSync(usersFile, JSON.stringify([]));
}

app.use(express.json());
app.use(cors());
app.use(express.static(path.resolve(__dirname, "public")));

app.post("/feedbacks", (req, res) => {
  const { userName, comment, token } = req.body;

  if (!comment) {
    return res.status(400).json({ error: "The comment is required." });
  }

  try {
    const feedbacks = JSON.parse(fs.readFileSync(feedbacksFile, "utf-8"));
    const newFeedback = { userName, comment, token };
    feedbacks.push(newFeedback);

    fs.writeFileSync(feedbacksFile, JSON.stringify(feedbacks, null, 2));

    res.status(200).json({
      message: "Comment saved successfully! Thanks for your message.",
      feedback: newFeedback,
    });
    console.log(`Feedback saved: ${comment}\n from ${userName}`);
  } catch (error) {
    console.error("Error saving feedback:", error);
    res.status(500).json({ error: "Failed to save feedback" });
  }
});

app.get("/feedbacks", (_, res) => {
  try {
    const feedbacks = JSON.parse(fs.readFileSync(feedbacksFile, "utf-8"));
    res.status(200).json(feedbacks);
  } catch (error) {
    console.error("Error reading feedbacks:", error);
    res.status(500).json({ error: "Failed to read feedbacks" });
  }
});

app.get("/users", (_, res) => {
  try {
    const users = JSON.parse(fs.readFileSync(usersFile, "utf-8"));
    res.status(200).json(users);
  } catch (error) {
    console.error("Error reading users:", error);
    res.status(500).json({ error: "Failed to read users" });
  }
});

app.post("/users", (req, res) => {
  const { name, token } = req.body;

  if (!name) {
    return res.status(400).json({ error: "userName is required." });
  }

  try {
    const users = JSON.parse(fs.readFileSync(usersFile, "utf-8"));
    const newUser = { name, token };
    users.push(newUser);

    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));

    res
      .status(201)
      .json({ message: "User registered successfully.", user: newUser });
    console.log(`User registered: ${name}\n token: ${token}`);
  } catch (error) {
    console.error("Error registering user:", error.message);
    res.status(500).json({ error: "Failed to register user." });
  }
});
app.get("/users/:name", (req, res) => {
  const { name } = req.params;

  try {
    const users = JSON.parse(fs.readFileSync(usersFile, "utf-8"));
    const userExists = users.some((user) => user.name === name);

    if (userExists) {
      res.status(200).json({ message: "User exists.", exists: true });
    } else {
      res.status(404).json({ message: "User not found.", exists: false });
    }
  } catch (error) {
    console.error("Error checking user:", error.message);
    res.status(500).json({ error: "Failed to check user." });
  }
});


app.use((err, _, res, __) => {
  console.error(err.stack);
  res.status(500).send("Something is broke!");
});

app.use((_, res) => {
  res.status(404).sendFile(path.resolve(__dirname, "public", "404.html"));
});

app.listen(PORT, () => {
  console.log(`Backend is running ma boy!`);
});
