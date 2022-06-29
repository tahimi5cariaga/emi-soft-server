const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// import routes
const authRoute = require('./routes/auth');

dotenv.config();

// connect to db
mongoose.connect(
  process.env.DB_CONNECT,
  () => console.log('connected to bd!')
);

// Middleware
app.use(express.json());

// import middlewares
app.use('/api/user', authRoute);


app.listen(3000, () => console.log('Server up and running'));
