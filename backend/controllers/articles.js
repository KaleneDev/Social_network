const Articles = require("../models/Articles");
const Users = require("../models/Users");

exports.getAll = async (req, res) => {
    // GET all articles
    try {
        const articles = await Articles.findAll({
            include: [
                {
                    model: Users,
                    as: "users",
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
            // include: [
            //     {
            //         model: Users,
            //         attributes: ["username"],
            //     },
            // ],
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
        const { title, user_id } = req.body;
        console.log(req.body.title);
        console.log(req.body.user_id);

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
