const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
//
const cors = require('cors');
//
const trainerRoutes = require('./routes/trainer-routes');
// const scheduleRoutes=require('./routes/scheduledClasses-routes')
const usersRoutes = require('./routes/users-routes');
const HttpError = require('./models/http-error');

const app = express();

app.use(bodyParser.json());
//
// Use CORS
app.use(cors());
//
app.use('/api/trainer', trainerRoutes);
app.use('/api/users', usersRoutes);
// app.use('/api/trainer/scheduleClass', scheduleRoutes);

app.use((req, res, next) => {
  const error = new HttpError('Could not find this route.', 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || 'An unknown error occurred!' });
});

mongoose
  .connect('mongodb+srv://preethisundharps:WLvifNNAPEe22u78@cluster0.102of.mongodb.net/fitness_platform')
  .then(() => {
    console.log('connection success')
    app.listen(5001);
  })
  .catch(err => {
    console.log(err);
  });

