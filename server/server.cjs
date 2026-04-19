require('dotenv').config({ path: __dirname + '/.env' });
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Portfolio = require('./models/Portfolio.cjs');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

// --- Routes ---

// Get Portfolio Data
app.get('/api/portfolio', async (req, res) => {
  try {
    const data = await Portfolio.findOne(); // Assuming only one document exists
    if (!data) {
      return res.status(404).json({ message: "No data found" });
    }
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update Portfolio Data
app.put('/api/portfolio', async (req, res) => {
  try {
    // Upsert logic: update the first document, or create it if none exists
    let data = await Portfolio.findOne();
    if (data) {
      // Update existing
      data.set(req.body);
      await data.save();
    } else {
      // Create new
      data = new Portfolio(req.body);
      await data.save();
    }
    res.json({ message: "Portfolio updated successfully", data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin Login (Hardcoded for now)
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (username === process.env.ADMIN_USER && password === process.env.ADMIN_PASS) {
    res.json({ success: true, token: "mock-admin-token-123" });
  } else {
    res.status(401).json({ success: false, message: "Invalid credentials" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
