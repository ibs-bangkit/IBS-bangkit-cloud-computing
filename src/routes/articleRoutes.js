const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');

// Rute untuk mendapatkan semua artikel
router.get('/articles', articleController.getArticles);

module.exports = router;
