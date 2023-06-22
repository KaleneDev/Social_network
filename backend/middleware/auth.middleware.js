const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];
        console.log(authHeader);
        const token = authHeader && authHeader.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.userId;
        console.log(decodedToken);
        if (req.body.userId && req.body.userId !== userId) {
            throw "User ID non valable !";
        } else {
            next();
        }
    } catch (error) {
        res.status(401).json({ error: error | "Requête non authentifiée !" });
    }
};


module.exports = auth;

