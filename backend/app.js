const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
require('dotenv').config();
const {User, Story, connectToDb} = require("./db.js");
const cors = require('cors');


connectToDb();

// Express Middleware
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

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

const authRoute = require('./Routes/auth.js')
app.use('/auth', authRoute,)

const postsRoute = require('./Routes/posts.js')
app.use('/posts', postsRoute,)

const usersRoute = require('./Routes/users.js')
app.use('/users', usersRoute)

// Start Server
app.listen(3000, () => {
    console.log('Server running on port 3000');
});

