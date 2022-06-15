const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();
const username = process.env.USER;
const password = process.env.PASSWORD;
const userRoutes = require('./routes/user');
const productRoutes = require('./routes/product');
const commentRoutes = require('./routes/comment');
const categoryRoutes = require('./routes/category');

mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.mbxky.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected !'))
  .catch(() => console.log('MongoDB not connected !'));

const app = express();
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });


app.use(cors());




app.use('/api/auth', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/category', categoryRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;
