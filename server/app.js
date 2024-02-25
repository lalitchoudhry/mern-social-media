
// PACKAGES
require('dotenv').config();
const express = require('express');
const multer = require('multer');
const helmet = require('helmet');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bcryptjs = require('bcryptjs');
// const {fileURLToPath} = require('url');
const path = require("path")
const { register } = require('./controllers/user');
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/posts');
const verifyToken = require('./middleware/auth');
const { createPost } = require('./controllers/post');

// COFIG AND MIDDLEWARE
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(morgan("common"));
app.use(cors());
// const _filename = fileURLToPath(require(meta.url));
// const _dirname = path.dirname(_filename);
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

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
app.post('/post', verifyToken, upload.single("picture"), createPost);

// ROUTES
app.get('/', (req, res)=>{
    res.send("server is on");
})

app.use("/auth", userRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

module.exports = app;