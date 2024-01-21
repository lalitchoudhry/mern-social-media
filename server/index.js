require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');

const PORT = process.env.PORT || 80

//WRONG ROUTE ERROR HANDLER
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err)
})

//ERROR HANDLER
app.use((err, req, res) => {
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message
        }
    })
})

// DATABASE CONNECTION
mongoose.connect(process.env.DATABASE_URI)
    .then(() => {
        // LISTEN
        app.listen(PORT, () => {
            console.log(`server is running on port ${PORT}`);
        });
    })
    .catch((err) => console.log(err.message));
