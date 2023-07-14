// const authHeader = req.headers["authorization"];
// const token = authHeader && authHeader.split(" ")[1];
const jwt = require("jsonwebtoken");
require("dotenv").config();


const auth = (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        console.log(token);

        if (token) {
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
            const userId = decodedToken.userId;
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
    console.log(token);

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

module.exports = { auth, requireAuth };
