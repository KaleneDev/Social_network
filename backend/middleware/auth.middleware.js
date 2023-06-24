const jwt = require("jsonwebtoken");
require("dotenv").config();

// const auth = (req, res, next) => {
//     const token = req.cookies.jwt;
//     console.log(token);
//     // check json web token exists & is verified
//     if (token) {
//         jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
//             if (err) {
//                 console.log(err.message);
//                 res.locals.user = null;
//                 res.cookies("jwt", "", { maxAge: 1 });
//                 next();
//             } else {
//                 console.log(decodedToken.userId);
//                 res.locals.user = decodedToken;
//                 next();
//             }
//         });
//     } else {
//         res.locals.user = null;
//         next();
//     }

// };

const auth = (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) {
            throw "User ID non valable !";
        } else {
            next();
        }
    } catch (error) {
        res.status(401).json({ error: error | "Requête non authentifiée !" });
    }
};

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    // check json web token exists & is verified
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.redirect("/login");
            } else {
                console.log(decodedToken.userId);
                res.locals.user = decodedToken;
                next();
            }
        });
    } else {
        res.redirect("/login");
    }
};

module.exports = { auth, requireAuth };
