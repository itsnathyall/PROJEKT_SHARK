const express = require('express');
require('dotenv').config();
const {connectToDb} = require("./db.js");
const app = express();
const cors = require('cors');
app.use(cors());

const PORT = 3000

connectToDb();

app.use(express.json());

const { authRouter } = require('./Routes/auth.js');
app.use('/auth', authRouter);

const postsRoute = require('./Routes/posts.js')
app.use('/posts', postsRoute,)

const usersRoute = require('./Routes/users.js')
app.use('/users', usersRoute)

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

