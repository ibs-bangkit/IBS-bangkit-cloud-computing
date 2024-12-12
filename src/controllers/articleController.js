const articleService = require('../services/articleServices');

const getArticles = (req, res) => {
    try {
        const articles = articleService.getAllArticles();
        res.json(articles);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch articles" });
    }
};

module.exports = {
    getArticles,
};
