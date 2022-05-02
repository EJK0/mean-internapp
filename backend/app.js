const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const postsRoutes = require('./routes/posts');
const usersRoutes = require('./routes/users');
const profileRoutes = require('./routes/profile');
const studentRoutes = require('./routes/student');
const coordinatorRoutes = require('./routes/coordinator');
const bioRoutes = require('./routes/bio');
const commentRoutes = require('./routes/comment');
const announcementsRoutes = require('./routes/announcements');

const app = express();
// Local
const mongoDB = 'mongodb://localhost:27017/node-angular';
// Atlas
// const mongoDB = 'mongodb+srv://admin:xUn7Xa6m4bdWWnfk@cluster0.rydkl.mongodb.net/internappV2?retryWrites=true&w=majority';
const options = {useNewUrlParser: true, useUnifiedTopology: true};
mongoose.connect(mongoDB, options);

mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error: '));
mongoose.connection.once('open', () => {
  console.log('Connected to database!');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/images', express.static(path.join('backend/images')));
app.use('/docs', express.static(path.join('backend/docs')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods',
      'GET, POST, PATCH, DELETE, OPTIONS');
  next();
});

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'This is the root of the server!',
  });
});

app.use('/api/posts', postsRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/coordinator', coordinatorRoutes);
app.use('/api/bio', bioRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/announcements', announcementsRoutes);


module.exports = app;
