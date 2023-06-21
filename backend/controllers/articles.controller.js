const Articles = require("../models/Articles.model");
const Users = require("../models/Users.model");
const Comments = require("../models/Comments.model");

exports.getAll = async (req, res) => {
    // GET all articles
    try {
        const articles = await Articles.findAll({
            include: [
                {
                    model: Users,
                    as: "users",
                },
                {
                    model: Comments,
                    as: "comments",
                },
            ],
        });
        res.status(200).json(articles);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Erreur lors de la récupération des articles.",
        });
    }
};
exports.getOne = async (req, res) => {
    // GET one article
    try {
        const article = await Articles.findByPk(req.params.id, {
            include: [
                {
                    model: Users,
                    as: "users",
                },
            ],
        });
        res.status(200).json(article);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Erreur lors de la récupération de l'article.",
        });
    }
};
exports.create = async (req, res) => {
    // POST an article
    try {
        const { title, user_id, content } = req.body;

        // Check if article already exists
        const articleExists = await Articles.findOne({
            where: {
                title: title,
            },
        });
        if (articleExists) {
            return res.status(400).json({
                message: "Cet article existe déjà.",
            });
        }
        const newArticle = {
            title,
            content,
            user_id,
        };
        const article = await Articles.create(newArticle);
        res.status(200).json(article);
    } catch (err) {
        // If error, return error
        console.error(err);
        res.status(500).json({
            message: "Erreur lors de la création de l'article.",
        });
    }
};
exports.update = async (req, res) => {
    // PUT an article
    try {
        const { title, user_id } = req.body;
        const article = await Articles.findByPk(req.params.id);
        if (!article) {
            return res.status(400).json({
                message: "Cet article n'existe pas.",
            });
        }
        const updatedArticle = {
            title,
            user_id,
        };
        await article.update(updatedArticle);
        res.status(200).json(article);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Erreur lors de la modification de l'article.",
        });
    }
};
exports.delete = async (req, res) => {
    // DELETE an article
    try {
        const article = await Articles.findByPk(req.params.id);
        if (!article) {
            return res.status(400).json({
                message: "Cet article n'existe pas.",
            });
        }
        await article.destroy();
        res.status(200).json({
            message: "L'article a bien été supprimé.",
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Erreur lors de la suppression de l'article.",
        });
    }
};
