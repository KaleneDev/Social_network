// const authHeader = req.headers["authorization"];
// const token = authHeader && authHeader.split(" ")[1];

const jwt = require("jsonwebtoken");
require("dotenv").config();
const Articles = require("../models/Articles.model");

const auth = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;

        if (token) {
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

            if (req.body.userId && req.body.userId !== userId) {
                throw "User ID non valable !";
            } else {
                next();
            }
        } else {
            throw "Token non trouvé dans les cookies !";
        }
    } catch (error) {
        res.status(401).json({ error: error || "Requête non authentifiée !" });
    }
};
const authArticles = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;

        if (token) {
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
            const { userId, role } = decodedToken;
            const articleId = req.params.id;
            console.log("articleId", articleId);
            if (articleId) {
                if (articleId !== undefined) {
                    const userArticle = await Articles.findByPk(articleId);
                    if (userArticle.user_id !== userId && role !== "admin") {
                        return res.status(400).json({
                            error: "Vous n'avez pas les droits pour modifier cet article.",
                        });
                    }
                }
            }

            if (req.body.userId && req.body.userId !== userId) {
                throw "User ID non valable !";
            } else {
                next();
            }
        } else {
            throw "Token non trouvé dans les cookies !";
        }
    } catch (error) {
        res.status(401).json({ error: error || "Requête non authentifiée !" });
    }
};

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.redirect("/login");
            } else {
                res.locals.user = decodedToken;
                next();
            }
        });
    } else {
        res.redirect("/login");
    }
};
const requireAdmin = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.redirect("/login");
            } else {
                if (decodedToken.role === "admin") {
                    res.locals.user = decodedToken;
                    next();
                } else {
                    res.redirect("/login");
                }
            }
        });
    } else {
        res.redirect("/login");
    }
};
module.exports = { auth, requireAuth, requireAdmin, authArticles };
