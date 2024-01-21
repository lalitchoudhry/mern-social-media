
// PACKAGES
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
const path = require('path');

// COFIG AND MIDDLEWARE
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(morgan("common"));
app.use(cors());
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// FILE STORAGE
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/assets");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})
const upload = multer({storage});

// ROUTES WITH FILE
app.post('/auth/register', upload.single("picture"), register);
app.post('/post', verfytoken, upload.single("picture"), createPost);

// ROUTES
app.get('/', (req, res)=>{
    res.send("hello dp");
})

module.exports = app;