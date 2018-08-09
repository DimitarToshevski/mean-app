const express = require('express');
const bodyParser = require('body-parser');

const Post = require('./models/post');

const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://localhost:27017/mean-app',{ useNewUrlParser: true })
.then(() => {
  console.log('Connected to database!')
})
.catch(() => {
  console.log('Connection failed!')
});

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  next();
});

app.post('/api/posts', (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save();
  res.status(201).json({
    message: 'Post added successfully'
  });
});

app.get('/api/posts', (req, res, next) => {
  const posts = [
    { id: 'qweqweqwd12d21', title: 'FIrst post from server', content: 'coming from the server'},
    { id: 'wd1212d21d12d', title: 'Second post from server', content: 'coming from the server'},
    { id: 'wqdwqfg1', title: 'Third post from server', content: 'coming from the server'}
  ]
  res.status(200).json({
    message: 'Posts fetched successfully',
    posts: posts
  });
});

module.exports = app;
