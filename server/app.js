
// packages
require('dotenv').config();
const express = require('express');
const multer = require('multer');
const helmet = require('helmet');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bcryptjs = require('bcryptjs');
const mongoose = require('./config/database');
const {fileURLToPath} = require('url');

// middleware
const app = express();
app.use(express.json());

// routes
app.get('/', (req, res)=>{
    res.send("hello dp");
})

module.exports = app;