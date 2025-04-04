project-root/
│
├── quiz.html             # Frontend file for quiz UI and logic
│
└── quiz-backend/         # Backend folder
    ├── index.js          # Node.js + Express backend
    └── package.json      # Dependency configuration

quiz-backend/
├── server.js
├── questions.json
└── package.json
Step-by-Step Setup Instructions
Step 1: Prepare the Quiz Frontend
Ensure the quiz.html file is complete and located in your project root directory. It should contain:

Multiple choice quiz questions

Timer functionality

JavaScript logic to calculate the score

A script to send the results to the backend server

Step 2: Start MongoDB Server
MongoDB is used as the database to store quiz results.

Open a terminal or Command Prompt.

Create a database directory if it doesn’t already exist:

bash
Copy
Edit
mkdir C:\data\db
Start the MongoDB server by running:

bash
Copy
Edit
mongod --dbpath C:\data\db
This command runs the MongoDB server and must be kept running while your app is in use.

Step 3: Setup Node.js + Express Backend
Set up your server with Express and Mongoose to handle incoming quiz submissions.

3.1 Create Backend Directory
bash
Copy
Edit
mkdir quiz-backend
cd quiz-backend
3.2 Initialize npm and install dependencies
bash
Copy
Edit
npm init -y
npm install express mongoose cors
3.3 Create Backend Server File
Create a file named index.js inside quiz-backend folder and add the following code:

javascript
Copy
Edit
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/quizDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const responseSchema = new mongoose.Schema({
  name: String,
  score: Number,
  timeTaken: Number,
  timestamp: { type: Date, default: Date.now }
});

const Response = mongoose.model("Response", responseSchema);

app.post("/submit", async (req, res) => {
  const { name, score, timeTaken } = req.body;
  const newResponse = new Response({ name, score, timeTaken });
  await newResponse.save();
  res.json({ message: "Result saved successfully" });
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
3.4 Start Backend Server
Run the following in the backend folder:

bash
Copy
Edit
node index.js
You should see:

arduino
Copy
Edit
Server running on http://localhost:5000
Step 4: Connect Frontend to Backend
In your quiz.html, make sure your JavaScript includes the following code to submit results:

javascript
Copy
Edit
fetch("http://localhost:5000/submit", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    name: userName,
    score: finalScore,
    timeTaken: timeSpent
  })
});
This function is triggered when the quiz ends and will send the user's results to your Express backend.

Testing the Full Stack
Start MongoDB Server:

bash
Copy
Edit
mongod --dbpath C:\data\db
Start Backend Server:

bash
Copy
Edit
cd quiz-backend
node index.js
Open quiz.html in a browser.

Complete the quiz and submit.

Check MongoDB to confirm the entry was saved.

Viewing Data in MongoDB
To verify if records were stored successfully, use MongoDB Compass:

Open MongoDB Compass.

Connect to:

arduino
Copy
Edit
mongodb://localhost:27017
Navigate to:

makefile
Copy
Edit
Database: quizDB
Collection: responses
You will see documents like:

json
Copy
Edit
{
  "_id": "604b0fd4...",
  "name": "Student",
  "score": 8,
  "timeTaken": 134,
  "timestamp": "2025-04-04T09:30:25.457Z"
}
Future Improvements
Add real-time leaderboard display.

Allow users to log in and track history.

Dynamically load questions from a database.

Add email notifications after submission.

Host the project using cloud platforms (e.g., Heroku, Vercel).

Add unit tests and improve error handling.

Summary
This project demonstrates how a Computer Science student can build a basic full-stack application integrating:

A frontend for user interaction

A backend to handle data processing and storage

A NoSQL database (MongoDB) to persist user records

By completing this project, you will gain experience with:

REST API design

Express routing

Database schema modeling

Frontend-backend integration

Working with developer tools like MongoDB Compass

License
This project is open-source and free to use for educational and non-commercial purposes.
