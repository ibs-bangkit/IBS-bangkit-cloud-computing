require('dotenv').config();

const express = require('express');
const cors = require("cors");
const bodyParser = require("body-parser");
const predictionRoutes = require('./routes/predictionRoutes');
const authRoutes = require('./routes/authRoutes');
const articleRoutes = require('./routes/articleRoutes')
const loadModel = require('./services/loadModel');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

// Middleware for CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

(async () => {
    // Load model secara asinkron
    const model = await loadModel();

    // Middleware untuk menyisipkan model ke request
    app.use((req, res, next) => {
        req.model = model;  // Menyisipkan model ke request object
        next();
    });

    // Gunakan routing untuk prediksi dan autentikasi
    // app.use('/api', predictionRoutes);
    // app.use('/auth', authRoutes);
    app.use(predictionRoutes, authRoutes, articleRoutes);

    // Middleware error handler
    app.use(errorHandler);
})();


module.exports = app;