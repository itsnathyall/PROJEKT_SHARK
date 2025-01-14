const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
// const {users, registerUser, findUserByEmail, findUserById} = require('./users');
const bcrypt = require('bcryptjs');


const users = []; //make-believe database for now

async function registerUser(email, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({id: Date.now().toString(), email, password: hashedPassword});
}

function findUserByEmail(email) {
    return users.find(user => user.email === email);
}

function findUserById(id) {
    return users.find(user => user.id === id);
}

//Express Middleware

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({secret: 'secret-key', resave: false, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());

//Configuring Passport

passport.use(
    new LocalStrategy({usernameField: 'email'}, async (email, password, done) => {
        const user = findUserByEmail(email);
        if(!user) return done(null, false, {message: 'Incorrect email'});
        
        const match = await bcrypt.compare(password, user.password);
        if(!match) return done(null, false, {message:'Incorrect password'});

        return done(null, user);
    })
);

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
    const user = findUserById(id);
    if(!user) return done(new Error('User not found'));
    done(null, user);
});

//Routes
//Register

app.post('/register', async (req, res) => {
    const {email, password} = req.body;
    if(findUserByEmail(email)){
        return res.status(400).json({message: 'User already exists'});
    }
    await registerUser(email, password);
    res.status(201).json({message: 'User registered'});
});

//Login

app.post('/login', passport.authenticate('local'), (req, res) => {
    res.json({message: 'Logged in', user: {id: req.user.id, email: req.user.email}});
});

//Logout

app.post('/logout', (req, res) => {
    req.logout(err => {
        if(err) return res.status(500).json({message: 'Error logging out'});
        res.json({message: 'Logged out'})
    });
});

app.listen(3000);