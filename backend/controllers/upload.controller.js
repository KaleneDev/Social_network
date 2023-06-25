const Users = require("../models/Users.model");
const bcrypt = require("bcrypt");
const Articles = require("../models/Articles.model");
const Comments = require("../models/Comments.model");
const fs = require("fs");
const path = require("path");
const { use } = require("../routes/users.routes");
const filename = path.resolve();
const dirname = path.dirname(filename);

exports.uploadUser = async (req, res) => {
    try {
        const { username, userId } = req.body;
        const file = req.file;
        if (!username) {
            return res.status(400).json({
                error: "Veuillez fournir tous les champs obligatoires.",
            });
        }
        function deleteFile() {
            if (req.file) {
                const element = file.path;
                fs.unlink(element, () => {
                    return;
                });
            }
        }
        // const existingUsername = await Users.findOne({ where: { username } });
        const existingUserId = await Users.findOne({ where: { id: userId } });
        if (!existingUserId) {
            deleteFile();
            return res.status(400).json({
                error: "Cet utilisateur n'existe pas.",
            });
        }
        // si le fichier ne depasse pas 1Mo
        if (req.file && req.file.size > 10000000) {
            deleteFile();
            return res.status(400).json({
                error: "Le fichier est trop volumineux.",
            });
        }
        const User = {
            username,
        };
        if (req.file) {
            User.avatar = file.filename;
            User.avatarPath = path.join(
                "../frontend/public/upload/users/" + file.filename
            );
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
