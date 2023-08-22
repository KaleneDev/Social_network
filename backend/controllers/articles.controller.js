const Articles = require("../models/Articles.model");
const Users = require("../models/Users.model");
const Comments = require("../models/Comments.model");
const fs = require("fs");
const path = require("path");
const filename = path.resolve();
const dirname = path.dirname(filename);

exports.getAll = async (req, res) => {
    // GET all articles
    try {
        const articles = await Articles.findAll({
            include: [
                {
                    model: Users,
                    as: "user",
                },
                {
                    model: Comments,
                    as: "comments",
                    include: [
                        {
                            model: Users,
                            as: "user",
                        },
                    ],
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
                    as: "user",
                },
                {
                    model: Comments,
                    as: "comments",
                    include: [
                        {
                            model: Users,
                            as: "user",
                        },
                    ],
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
        for (let index = 0; index < req.files.length; index++) {
            const element = req.files[index];

            if (
                element.mimetype !== "image/png" &&
                element.mimetype !== "image/jpeg" &&
                element.mimetype !== "image/jpg"
            ) {
                return res.status(400).json({
                    message: "Le fichier doit être au format png, jpeg ou jpg.",
                });
            }

            if (element.size > 10000000) {
                return res.status(400).json({
                    message: "Le fichier ne doit pas dépasser 10Mo.",
                });
            }
        }

        const { title, user_id, content } = req.body;

        const newArticle = {
            title,
            content,
            user_id,
        };

        const files = req.files;
        if (files) {
            for (let index = 0; index < files.length; index++) {
                if (index === 0) {
                    newArticle.file = "";
                }
                newArticle.file += path.join(
                    "public/upload/articles/" + files[index].filename
                );
                if (index < files.length - 1) {
                    newArticle.file += " + ";
                }
            }
        }
        const article = await Articles.create(newArticle);
        res.status(200).json({
            message: "L'article a été créé avec succès.",
            article: article,
        });
    } catch (err) {
        res.status(500).json({
            message: "Erreur lors de la création de l'article.",
        });
    }
};
exports.update = async (req, res) => {
    // PUT an article
    try {
        const { title, content } = req.body;
        const files = req.files;
        const article = await Articles.findByPk(req.params.id);

        function deleteFile() {
            if (files) {
                for (let index = 0; index < files.length; index++) {
                    const element = files[index].path;
                    fs.unlink(element, () => {
                        return;
                    });
                }
            }
        }
        if (!article) {
            deleteFile();
            return res.status(400).json({
                error: "Cet article n'existe pas.",
            });
        }

        if (files && files.size > 100000000) {
            deleteFile();
            return res.status(400).json({
                error: "Le fichier est trop volumineux il doit faire moins de 10Mo.",
            });
        }

        const updatedArticle = {
            title,
            content,
        };
        if (files) {
            for (let index = 0; index < files.length; index++) {
                if (index === 0) {
                    updatedArticle.file = "";
                }
                updatedArticle.file += files[index].filename;
                if (index < files.length - 1) {
                    updatedArticle.file += " + ";
                }
            }
            // delete existingArticle.file;
            const elements = article.file.split(" + ");
            for (let index = 0; index < elements.length; index++) {
                const element = elements[index];
                fs.unlink(
                    `${dirname}\\frontend\\public\\upload\\articles\\${element}`,
                    () => {
                        return;
                    }
                );
            }
        }

        await article.update(updatedArticle);
        res.status(200).json({
            message: "L'article a été mis à jour avec succès.",
            article: updatedArticle,
        });
    } catch (err) {
        res.status(500).json({
            message: "Erreur lors de la modification de l'article.",
        });
    }
};
exports.delete = async (req, res) => {
    // DELETE an article
    try {
        const article = await Articles.findByPk(req.params.id);
        if (article.file) {
            const elements = article.file.split(" + ");
            for (let index = 0; index < elements.length; index++) {
                const element = elements[index];
                console.log(`/${element}/`);
                fs.unlink(`${dirname}\\frontend\\${element}`, () => {
                    return;
                });
            }
        }

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
