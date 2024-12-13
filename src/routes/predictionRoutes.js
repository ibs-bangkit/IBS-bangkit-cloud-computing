const express = require('express');
const multer = require('multer');
const postPredictHandler = require('../controllers/predictionController');

const router = express.Router();
const upload = multer(); // Initialize multer for handling multipart/form-data

router.post('/predict', upload.single('image'), postPredictHandler); // The file input field is named 'image'

module.exports = router;
