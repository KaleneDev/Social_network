const Users = require("../models/Users.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { signUpErrors, signInErrors } = require("../utils/errors.utils");
require("dotenv").config();

const maxAge = 3 * 24 * 60 * 60 * 1000;

exports.signUp = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const errors = {};
        if (!username || !email || !password) {
            errors.badRequest =
                "Veuillez fournir tous les champs obligatoires.";
        }

        const emailExist = await Users.findOne({ where: { email: email } });
        if (emailExist) {
            errors.email = "L'email existe déjà.";
        }

        const usernameExist = await Users.findOne({
            where: { username: username },
        });
        if (usernameExist) {
            errors.username = "Le nom d'utilisateur existe déjà.";
        }

        if (username.length < 4 || username.length > 20) {
            errors.username =
                "Le nom d'utilisateur doit contenir entre 4 et 20 caractères.";
        }
        if (password.length < 6) {
            errors.password =
                "Le mot de passe doit contenir au moins 6 caractères.";
        }
        if (Object.keys(errors).length > 0) {
            return res.status(400).json({ errors });
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
        const errors = signUpErrors(err);
        res.status(500).send({ errors });
    }
};
exports.signIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Users.findOne({ where: { email: email } });
        if (!user) {
            return res
                .status(400)
                .json({ errors: { email: "L'email n'existe pas." } });
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                errors: {
                    password: "Mot de passe incorrect.",
                },
            });
        }

        const token = jwt.sign(
            {
                userId: user.id,
                username: user.username,
                email: user.email,
                role: user.role,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: maxAge,
            }
        );

        res.cookie("jwt", token, {
            httpOnly: true,
            maxAge,
            domain: ".social-network-kalene.netlify.app",
        });

        res.status(200).json({
            message: "Authentification réussie",
            token: token,
        });
    } catch (err) {
        res.status(500).send({ err });
    }
};
exports.signOut = (req, res) => {
    res.cookie("jwt", "", { maxAge: 1 });
    res.status(200).json({
        message: "Déconnexion réussie",
    });
};
