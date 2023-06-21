const Users = require("../models/Users.model");
const bcrypt = require("bcrypt");

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

        res.status(200).json(user.username + " " + "vous êtes connecté.");
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Erreur lors de l'authentification.",
        });
    }
};
