const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
require('dotenv').config();
const {User, Story, P} = require("./db.js");



// MongoDB setup
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));


// Express Middleware
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Session Middleware
app.use(session({
    secret: process.env.SESSION_SECRET || 'secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true, secure: process.env.NODE_ENV === 'production' }
}));

app.use(passport.initialize());
app.use(passport.session());

// Passport Configuration
passport.use(
    new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    try {
        const user = await User.findOne({ email });
        if (!user) return done(null, false, { message: 'Incorrect email' });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return done(null, false, { message: 'Incorrect password' });

        return done(null, user);
    } catch (error) {
        return done(error);
    }
})
);

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
    try {
    const user = await User.findById(id);
    if (!user) return done(new Error('User not found'));
    done(null, user);
    } catch (error) {
    done(error);
    }
});

// Routes

// Register Route
app.post('/register', async (req, res) => {
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
    res.status(500).json({ message: 'Error registering user' });
}
});

// Login Route
app.post('/login', passport.authenticate('local'), (req, res) => {
    res.json({ message: 'Logged in', user: { id: req.user.id, email: req.user.email } });
});

// Logout Route
app.post('/logout', (req, res) => {
    req.logout(err => {
    if (err) return res.status(500).json({ message: 'Error logging out' });
    res.json({ message: 'Logged out successfully' });
    });
});

// Start Server
app.listen(3000, () => {
    console.log('Server running on port 3000');
});
