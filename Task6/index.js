const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./userModel');
const bodyParser = require('body-parser');

// Use cors for cross-origin requests if needed
app.use(cors());
app.use(bodyParser.json());

// Replace with your MongoDB connection URI
const mongoURI = "mongodb+srv://admin:admin123@cluster0.warrdmw.mongodb.net/met";

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('DB Connected!'))
  .catch(err => console.error('DB connection error:', err));

// Middleware to parse JSON bodies
app.use(express.json());

// GET /api/selectUsers: Fetch all users as JSON
app.get("/api/selectUsers", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ message: 'Error fetching users' });
  }
});

app.get("/",(req,res)=>{
    res.render('index.ejs');
})

// GET /api/selectUsers1: Render HTML with user data using EJS
app.get("/api/selectUsers1", async (req, res) => {
  try {
    const users = await User.find();
    res.render('users.ejs', { data: users });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).render('users.ejs', { data: [], error: error });
  }
});

// POST /api/addUsers: Add a new user
app.post("/api/addUsers", async (req, res) => {
  try {
    const formData = req.body;
    console.log(formData);
    // Check if required fields are provided in the request body
    if (!formData.username || !formData.userage || !formData.userlocation) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newUser = new User(formData);
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (err) {
    res.status(400).json({ message: 'Error adding user' });
  }
});

// Use a suitable port (not 3000 for Node.js in production)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));