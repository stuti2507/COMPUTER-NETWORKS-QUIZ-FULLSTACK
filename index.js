const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/quizDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a schema for quiz responses
const responseSchema = new mongoose.Schema({
  name: String,
  score: Number,
  timeTaken: Number,
  timestamp: { type: Date, default: Date.now }
});

const Response = mongoose.model("Response", responseSchema);

// POST endpoint to save quiz response
app.post("/submit", async (req, res) => {
  const { name, score, timeTaken } = req.body;
  const result = new Response({ name, score, timeTaken });
  await result.save();
  res.json({ message: "Response submitted successfully!" });
});

// GET endpoint to fetch all results (optional)
app.get("/results", async (req, res) => {
  const results = await Response.find().sort({ timestamp: -1 });
  res.json(results);
});

// Start the server
app.listen(5000, () => {
  console.log("Backend running at http://localhost:5000");
});
