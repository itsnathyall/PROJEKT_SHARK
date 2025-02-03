const express = require('express');
require('dotenv').config();
const {connectToDb} = require("./db.js");
const app = express();
const cors = require('cors');
app.use(cors());


connectToDb();

app.use(express.json());

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

