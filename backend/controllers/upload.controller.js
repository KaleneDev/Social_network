const Users = require("../models/Users.model");
const Articles = require("../models/Articles.model");
const fs = require("fs");
const path = require("path");
exports.uploadUser = async (req, res) => {
    try {
        const { userId, username } = req.body;
        const errors = {};
        const file = req.file;
        if (!userId || !username) {
            errors.userId = "Veuillez fournir un id ou nom d'utilisateur.";
        }
        // si username correspond a userId
        if (username && userId) {
            const existingUsername = await Users.findOne({
                where: { username: username },
            });
            if (existingUsername && existingUsername.id !== userId) {
                errors.username = "Cet utilisateur n'existe pas.";
                deleteFile();
            }
        }
        function deleteFile() {
            if (req.file) {
                const element = file.path;
                fs.unlink(element, () => {
                    return;
                });
            }
        }
        const existingUserId = await Users.findOne({ where: { id: userId } });
        if (!existingUserId) {
            deleteFile();
            errors.username = "Cet utilisateur n'existe pas.";
        }
        // si le fichier ne depasse pas 5Mo
        if (req.file && req.file.size > 50000000) {
            deleteFile();
            errors.file = "Le fichier est trop volumineux.";
        }
        if (Object.keys(errors).length > 0) {
            return res.status(400).json({ errors });
        }
        const User = {};
        if (req.file) {
            const serverBaseUrl = `${req.protocol}://${req.get("host")}`;
            User.avatar = serverBaseUrl + "/uploads/users/" + file.filename;
        }
        // add avatarPath to existingUsername
        await Users.update(User, {
            where: { id: userId },
        });
        res.status(200).json(User);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Erreur lors de la création de l'utilisateur.",
        });
    }
};
exports.uploadArticle = async (req, res) => {
    try {
        const { user_id, articles_id } = req.body;
        const files = req.files;
        if (!user_id || !articles_id) {
            return res.status(400).json({
                error: "Veuillez fournir tous les champs obligatoires.",
            });
        }
        function deleteFile() {
            if (req.files) {
                for (let index = 0; index < files.length; index++) {
                    const element = files[index].path;
                    fs.unlink(element, () => {
                        return;
                    });
                }
            }
        }
        const existingUserId = await Users.findOne({ where: { id: user_id } });
        const existingArticleId = await Articles.findOne({
            where: { id: articles_id },
        });
        if (!existingUserId || !existingArticleId) {
            deleteFile();
            return res.status(400).json({
                error: "Cet utilisateur ou cet article n'existe pas.",
            });
        }
        // si le fichier ne depasse pas 10Mo
        if (files && files.size > 100000000) {
            return res.status(400).json({
                error: "Le fichier est trop volumineux il doit faire moins de 10Mo.",
            });
        }
        const Article = {
            user_id: user_id,
        };
        console.log(files);
        if (files) {
            for (let index = 0; index < files.length; index++) {
                if (index === 0) {
                    Article.file = "";
                }
                Article.file += files[index].filename;
                const serverBaseUrl = `${req.protocol}://${req.get("host")}`;
                Article.filePath =
                    serverBaseUrl +
                    "/uploads/articles/" +
                    files[index].filename;
                if (index < files.length - 1) {
                    Article.file += " + ";
                }
            }
            Article.file = files.filename;
        }
        // add filePath to existingArticleId
        await Articles.update(Article, {
            where: { id: articles_id },
        });
        res.status(200).json(Article);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Erreur lors de la création de l'article.",
        });
    }
};
