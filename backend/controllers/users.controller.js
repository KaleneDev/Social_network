const Users = require("../models/Users.model");
const bcrypt = require("bcrypt");
const Articles = require("../models/Articles.model");
const Comments = require("../models/Comments.model");
const Follow = require("../models/Follow.model");
const Likes = require("../models/Likes.model");

const fs = require("fs");

exports.getAll = async (req, res) => {
    try {
        const users = await Users.findAll({
            include: [
                {
                    model: Articles,
                    as: "articles",
                    include: {
                        model: Comments,
                        as: "comments",
                    },
                },
                {
                    model: Follow,
                    as: "Follower",
                    attributes: ["follower_id"],
                },
                {
                    model: Follow,
                    as: "Following",
                    attributes: ["following_id"],
                },
                {
                    model: Likes,
                    as: "likes",
                    attributes: ["user_id", "article_id"],
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
                {
                    model: Articles,
                    as: "articles",
                    include: {
                        model: Users,
                        as: "user",
                    },
                },
                {
                    model: Follow,
                    as: "Follower",
                    attributes: ["follower_id"],
                },
                {
                    model: Follow,
                    as: "Following",
                    attributes: ["following_id"],
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
exports.update = async (req, res) => {
    try {
        const { username, email, password, newPassword1, newPassword2 } =
            req.body.data;
        const errors = {};
        if (username) {
            // si le nom d'utilisateur existe déjà
            const existingUsername = await Users.findOne({
                where: { username: username },
            });
            if (existingUsername && existingUsername.id !== req.params.id) {
                errors.username =
                    "Un utilisateur avec ce nom d'utilisateur existe déjà.";
            }
        }
        if (email) {
            // si l'email existe déjà
            const existingEmail = await Users.findOne({
                where: { email: email },
            });
            if (existingEmail && existingEmail.id !== req.params.id) {
                errors.email = "Un utilisateur avec cet e-mail existe déjà.";
            }
        }

        // si ancien mot de passe correspond
        const userPass = await Users.findByPk(req.params.id);
        if (req.body.data.oldPassword) {
            const match = await bcrypt.compare(
                req.body.data.oldPassword,
                userPass.password
            );
            if (!match) {
                errors.oldPassword = "Le mot de passe est incorrect.";
            }
        }
        if (newPassword1) {
            // si le mot de passe est trop court
            if (newPassword1.length < 6) {
                errors.newPassword =
                    "Le mot de passe doit contenir au moins 6 caractères.";
            }
        }
        // si les nouveau mot de passe "NewPassword1" et "NewPassword2" correspondent
        if (
            (!newPassword1 && newPassword2) ||
            (newPassword1 && !newPassword2)
        ) {
            errors.newPassword = "Veuillez remplir tous les champs.";
        }

        if (
            (!req.body.data.oldPassword && newPassword1 !== undefined) ||
            (!req.body.data.oldPassword && newPassword2 !== undefined)
        ) {
            errors.oldPassword = "Veuillez donner votre mot de passe actuel";
        } else if (newPassword1 && newPassword2) {
            if (newPassword1 !== newPassword2) {
                errors.newPassword = "Les mots de passe ne correspondent pas.";
            }
        }

        if (Object.keys(errors).length > 0) {
            return res.status(400).json({ errors });
        }
        // si le mot de passe est modifié
        if (newPassword1) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(newPassword1, salt);
            req.body.data.password = hashedPassword;
        }
        const { ...updatedData } = req.body.data;
        const user = await Users.update(updatedData, {
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
            if (element !== "default.png" && elements) {
                fs.unlink(`${element}`, () => {
                    return;
                });
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
                console.log(files[index].filename, "filename");
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

exports.follow = async (req, res) => {
    try {
        const { user_id } = req.body;
        // Check if relation already exists
        const relationExists = await Follow.findOne({
            where: {
                following_id: req.params.id,
                follower_id: user_id,
            },
        });
        if (relationExists) {
            return res.status(400).json({
                message: "Cette relation existe déjà.",
            });
        }
        const relation = await Follow.create({
            following_id: req.params.id,
            follower_id: user_id,
        });
        res.status(201).json(relation);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Erreur lors de la création de la relation.",
        });
    }
};
exports.unfollow = async (req, res) => {
    try {
        const { user_id } = req.body;
        const relation = await Follow.findOne({
            where: {
                following_id: req.params.id,
                follower_id: user_id,
            },
        });
        if (!relation) {
            return res.status(404).json({
                message: "Cette relation n'existe pas.",
            });
        }
        await relation.destroy();
        res.status(200).json({
            message: "Relation supprimée avec succès.",
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Erreur lors de la suppression de la relation.",
        });
    }
};
exports.getFollowers = async (req, res) => {
    try {
        const followers = await Follow.findAll({
            where: {
                following_id: req.params.id,
            },
            include: [
                {
                    model: Users,
                    as: "follower",
                    attributes: ["id", "username", "avatar"],
                },
            ],
        });
        res.status(200).json(followers);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Erreur lors de la récupération des followers.",
        });
    }
};
exports.getFollowings = async (req, res) => {
    try {
        const followings = await Follow.findAll({
            where: {
                follower_id: req.params.id,
            },
            include: [
                {
                    model: Users,
                    as: "following",
                    attributes: ["id", "username", "avatar"],
                },
            ],
        });
        res.status(200).json(followings);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Erreur lors de la récupération des followings.",
        });
    }
};

exports.getFollowersCount = async (req, res) => {
    try {
        const followers = await Follow.count({
            where: {
                following_id: req.params.id,
            },
        });
        res.status(200).json(followers);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Erreur lors de la récupération des followers.",
        });
    }
};
exports.getFollowingsCount = async (req, res) => {
    try {
        const followings = await Follow.count({
            where: {
                follower_id: req.params.id,
            },
        });
        res.status(200).json(followings);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Erreur lors de la récupération des followings.",
        });
    }
};

// Likes
exports.like = async (req, res) => {
    try {
        const { user_id, article_id } = req.body;
        // Check if relation already exists
        const relationExists = await Likes.findOne({
            where: {
                article_id: article_id,
                user_id: user_id,
            },
        });
        if (relationExists) {
            return res.status(400).json({
                message: "Cette relation existe déjà.",
            });
        }
        const relation = await Likes.create({
            article_id: article_id,
            user_id: user_id,
        });
        res.status(201).json(relation);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Erreur lors de la création de la relation.",
        });
    }
};
exports.unlike = async (req, res) => {
    try {
        const { user_id, article_id } = req.body;
        const relation = await Likes.findOne({
            where: {
                article_id: article_id,
                user_id: user_id,
            },
        });
        if (!relation) {
            return res.status(404).json({
                message: "Cette relation n'existe pas.",
            });
        }
        await relation.destroy();
        res.status(200).json({
            message: "Relation supprimée avec succès.",
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Erreur lors de la suppression de la relation.",
        });
    }
};
exports.getLikes = async (req, res) => {
    try {
        const likes = await Likes.findAll({
            where: {
                article_id: req.params.id,
            },
            include: [
                {
                    model: Users,
                    as: "user",
                    attributes: ["id", "username", "avatar"],
                },
            ],
        });
        res.status(200).json(likes);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Erreur lors de la récupération des likes.",
        });
    }
};
exports.getLikesCount = async (req, res) => {
    try {
        const likes = await Likes.count({
            where: {
                article_id: req.params.id,
            },
        });
        res.status(200).json(likes);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Erreur lors de la récupération des likes.",
        });
    }
};
