const express = require('express');

const app = express();


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Header', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  next();
});

app.use('/api/posts', (req, res, next) => {
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
