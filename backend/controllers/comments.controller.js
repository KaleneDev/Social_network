const Comments = require("../models/Comments.model");
const Users = require("../models/Users.model");
const Articles = require("../models/Articles.model");
const fs = require("fs");
const path = require("path");
const filename = path.resolve();
const dirname = path.dirname(filename);

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
        for (let index = 0; index < req.files.length; index++) {
            const element = req.files[index];

            if (
                element.mimetype !== "image/png" &&
                element.mimetype !== "image/jpeg" &&
                element.mimetype !== "image/jpg"
            ) {
                return res.status(400).json({
                    message: "Le format de l'image n'est pas valide.",
                });
            }
            if (element.size > 10000000) {
                return res.status(400).json({
                    message: "L'image ne doit pas dépasser 10Mo.",
                });
            }
        }
        const { content, user_id, article_id } = req.body;
        const newComment = {
            content,
            user_id,
            article_id,
        };

        const files = req.files;
        if (files) {
            for (let index = 0; index < files.length; index++) {
                if (index === 0) {
                    newComment.file = "";
                }
                newComment.file += files[index].filename;
                if (index < files.length - 1) {
                    newComment.file += " + ";
                }
            }
        }
        const comment = await Comments.create(newComment);
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
        const elements = comment.file.split(" + ");
        for (let index = 0; index < elements.length; index++) {
            const element = elements[index];
            fs.unlink(
                `${dirname}\\frontend\\public\\upload\\articles\\${element}`,
                () => {
                    return;
                }
            );
        }
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
