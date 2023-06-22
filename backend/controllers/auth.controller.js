const Users = require("../models/Users.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const maxAge = 3 * 24 * 60 * 60 * 1000;

exports.signUp = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                error: "Veuillez fournir tous les champs obligatoires.",
            });
        }
        const usernameExist = await Users.findOne({
            where: { username: username },
        });
        if (usernameExist) {
            return res.status(400).json({
                error: "Le nom d'utilisateur existe déjà.",
            });
        }

        const emailExist = await Users.findOne({ where: { email: email } });
        if (emailExist) {
            return res.status(400).json({
                error: "L'email existe déjà.",
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                error: "Le mot de passe doit contenir au moins 6 caractères.",
            });
        }
        if (username.length < 4 || username.length > 20) {
            return res.status(400).json({
                error: "Le nom d'utilisateur doit contenir entre 4 et 20 caractères.",
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
exports.signIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Users.findOne({ where: { email: email } });

        if (!user) {
            return res.status(400).json({
                error: "L'utilisateur n'existe pas.",
            });
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(400).json({
                error: "Mot de passe incorrect.",
            });
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
            expiresIn: maxAge,
        });
        res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge });

        res.status(200).json({
            message: "Authentification réussie",
            token: token,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Erreur lors de l'authentification.",
        });
    }
};
exports.signOut = (req, res) => {
    res.cookie("jwt", "", { maxAge: 1 });
    res.status(200).json({
        message: "Déconnexion réussie",
    });
}

