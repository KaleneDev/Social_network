const Comments = require("../models/Comments.model");
const Users = require("../models/Users.model");
const Articles = require("../models/Articles.model");

exports.getAll = async (req, res) => {
    // GET all comments
    try {
        const comments = await Comments.findAll({
            include: [
                {
                    model: Users,
                    as: "users",
                },
                {
                    model: Articles,
                    as: "articles",
                },
            ],
        });
        res.status(200).json(comments);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Erreur lors de la récupération des commentaires.",
        });
    }
};
exports.getOne = async (req, res) => {
    // GET one comment
    try {
        const comment = await Comments.findByPk(req.params.id, {
            include: [
                {
                    model: Users,
                    as: "users",
                },
                {
                    model: Articles,
                    as: "articles",
                },
            ],
        });
        res.status(200).json(comment);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Erreur lors de la récupération du commentaire.",
        });
    }
};
exports.create = async (req, res) => {
    // POST a comment
    try {
        const { content, user_id, article_id } = req.body;

        const comment = await Comments.create({
            content: content,
            user_id: user_id,
            article_id: article_id,
        });
        res.status(201).json(comment);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Erreur lors de la création du commentaire.",
        });
    }
};
exports.update = async (req, res) => {
    // PUT a comment
    try {
        const { content } = req.body;
        const comment = await Comments.findByPk(req.params.id);
        if (!comment) {
            return res.status(404).json({
                message: "Ce commentaire n'existe pas.",
            });
        }
        await comment.update({
            content: content,
        });
        res.status(200).json(comment);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Erreur lors de la modification du commentaire.",
        });
    }
};
exports.delete = async (req, res) => {
    // DELETE a comment
    try {
        const comment = await Comments.findByPk(req.params.id);
        if (!comment) {
            return res.status(404).json({
                message: "Ce commentaire n'existe pas.",
            });
        }
        await comment.destroy();
        res.status(204).json({
            message: "Le commentaire a bien été supprimé.",
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Erreur lors de la suppression du commentaire.",
        });
    }
};
