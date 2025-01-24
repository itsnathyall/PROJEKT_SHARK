const express = require('express');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const {User, Story, connectToDb} = require("../db.js");
require('dotenv').config();

const router = express.Router();



// Routes

// Register Route
router.post('/register', async (req, res) => {
    const { email, password, name, lastname, username } = req.body;

  // Validate inputs
    if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        if (await User.findOne({ email })) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword, name, lastname, username });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
} catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error registering user' });
}
});

// Login Route
router.post('/login', passport.authenticate('local'), async (req, res) => {
    try{
        const user = await User.findOne({email: req.body.email})
        res.status(200).json(user)
    } catch(err){
        console.log(err);
    }
});

// Logout Route
router.post('/logout', (req, res) => {
    req.logout(err => {
    if (err) return res.status(500).json({ message: 'Error logging out' });
    res.json({ message: 'Logged out successfully' });
    });
});


module.exports = router;
