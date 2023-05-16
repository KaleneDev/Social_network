const Users = require("../models/Users");
const bcrypt = require("bcrypt");
exports.getAll = async (req, res) => {
    try {
        const users = await Users.findAll();
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
        const user = await Users.findByPk(req.params.id);
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
        console.log(req.body.username);

        if (!username || !email || !password) {
            return res.status(400).json({
                error: "Veuillez fournir tous les champs obligatoires.",
            });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = {
            username,
            email,
            password: hashedPassword,
        };

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
        const user = await Users.destroy({ where: { id: req.params.id } });
        res.status(200).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Erreur lors de la suppression de l'utilisateur.",
        });
    }
};
