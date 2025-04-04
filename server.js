const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ✅ Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/quizDB', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch(err => console.error('❌ MongoDB Connection Error:', err));

// ✅ Define Mongoose Schema for storing quiz scores
const ScoreSchema = new mongoose.Schema({
    name: String,
    score: Number,
    total: Number,
    timestamp: { type: Date, default: Date.now }
});

const Score = mongoose.model('Score', ScoreSchema);

// ✅ Quiz Questions
const questions = [
    { id: 1, question: "What is the subnet mask for a /26 network?", options: ["255.255.255.192", "255.255.255.224", "255.255.255.240", "255.255.255.128"], answer: "255.255.255.192" },
    { id: 2, question: "Which protocol operates at the Transport Layer?", options: ["IP", "TCP", "ARP", "ICMP"], answer: "TCP" },
    { id: 3, question: "The loopback address in IPv4 is?", options: ["192.168.1.1", "10.0.0.1", "127.0.0.1", "255.255.255.255"], answer: "127.0.0.1" },
    { id: 4, question: "Which field in the IP header helps prevent infinite loops?", options: ["IHL", "TTL", "Version", "Checksum"], answer: "TTL" },
    { id: 5, question: "The protocol responsible for domain name resolution is?", options: ["DHCP", "DNS", "FTP", "SMTP"], answer: "DNS" },
];

// ✅ Endpoint to fetch quiz questions
app.get('/quiz', (req, res) => {
    res.json(questions);
});

// ✅ Endpoint to submit answers and store score
app.post('/submit', async (req, res) => {
    const { answers, name } = req.body;
    
    let score = 0;
    const total = questions.length;

    questions.forEach(q => {
        if (answers[q.id] === q.answer) {
            score++;
        }
    });

    // ✅ Store score in MongoDB
    const newScore = new Score({ name, score, total });
    await newScore.save();

    res.json({ message: "Quiz submitted successfully!", score, total });
});

// ✅ Endpoint to fetch all stored scores
app.get('/scores', async (req, res) => {
    const scores = await Score.find().sort({ timestamp: -1 });
    res.json(scores);
});

// ✅ Start the server
app.listen(3000, () => console.log("✅ Server is running on http://localhost:3000"));
