const Users = require("../models/Users.model");
const bcrypt = require("bcrypt");
const Articles = require("../models/Articles.model");
const Comments = require("../models/Comments.model");
const fs = require("fs");
const path = require("path");
const filename = path.resolve();
const dirname = path.dirname(filename);

exports.getAll = async (req, res) => {
    try {
        const users = await Users.findAll({
            include: [
                {
                    model: Articles,
                    as: "articles",
                },
            ],
        });
        res.status(200).json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Erreur lors de la récupération des utilisateurs.",
        });
    }
};
exports.getOne = async (req, res) => {
    try {
        const user = await Users.findByPk(req.params.id, {
            include: [
                {
                    model: Articles,
                    as: "articles",
                    include: {
                        model: Comments,
                        as: "comments",
                    },
                },
            ],
        });
        res.status(200).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Erreur lors de la récupération de l'utilisateur.",
        });
    }
};
exports.create = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const file = req.file;
        if (!username || !email || !password) {
            return res.status(400).json({
                error: "Veuillez fournir tous les champs obligatoires.",
            });
        }
        const existingEmail = await Users.findOne({ where: { email } });
        function deleteFile() {
            const element = file.path;
            fs.unlink(element, () => {
                return;
            });
        }

        if (existingEmail) {
            // supprimer le fichier si mail existe
            deleteFile();
            return res.status(409).json({
                error: "Un utilisateur avec cet e-mail existe déjà.",
            });
        }
        const existingUsername = await Users.findOne({ where: { username } });

        if (existingUsername) {
            deleteFile();
            return res.status(409).json({
                error: "Un utilisateur avec ce nom d'utilisateur existe déjà.",
            });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = {
            username,
            email,
            password: hashedPassword,
        };

        if (req.file) {
            newUser.avatar = file.filename;
        }

        const user = await Users.create(newUser);
        res.status(200).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Erreur lors de la création de l'utilisateur.",
        });
    }
};
exports.update = async (req, res) => {
    try {
        const user = await Users.update(req.body, {
            where: { id: req.params.id },
        });
        res.status(200).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Erreur lors de la modification de l'utilisateur.",
        });
    }
};
exports.delete = async (req, res) => {
    try {
        const userAvatar = await Users.findByPk(req.params.id);
        const elements = userAvatar.avatar.split(" + ");
        for (let index = 0; index < elements.length; index++) {
            const element = elements[index];
            console.log(element);
            if (element !== "default.png" && elements) {
                fs.unlink(
                    `${dirname}\\frontend\\public\\assets\\users\\${element}`,
                    () => {
                        return;
                    }
                );
            }
        }
        const user = await Users.destroy({ where: { id: req.params.id } });
        res.status(200).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Erreur lors de la suppression de l'utilisateur.",
        });
    }
};
exports.upload = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const files = req.files;
        if (!username || !email || !password) {
            return res.status(400).json({
                error: "Veuillez fournir tous les champs obligatoires.",
            });
        }
        const existingEmail = await Users.findOne({ where: { email } });
        function deleteFile() {
            for (let index = 0; index < files.length; index++) {
                const element = files[index].path;
                console.log(element);
                fs.unlink(element, () => {
                    return;
                });
            }
        }

        if (existingEmail) {
            // supprimer le fichier si mail existe
            deleteFile();
            return res.status(409).json({
                error: "Un utilisateur avec cet e-mail existe déjà.",
            });
        }
        const existingUsername = await Users.findOne({ where: { username } });

        if (existingUsername) {
            deleteFile();
            return res.status(409).json({
                error: "Un utilisateur avec ce nom d'utilisateur existe déjà.",
            });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = {
            username,
            email,
            password: hashedPassword,
        };

        if (req.files) {
            for (let index = 0; index < files.length; index++) {
                if (index === 0) {
                    newUser.avatar = "";
                }
                newUser.avatar += files[index].filename;
                if (index < files.length - 1) {
                    newUser.avatar += " + ";
                }
            }
        }

        const user = await Users.create(newUser);
        res.status(200).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Erreur lors de la création de l'utilisateur.",
        });
    }
};
