const Users = require("../models/Users.model");

exports.uploadProfile = async (req, res) => {
    const files = req.files;
    try {
     
        res.send(`File has been uploaded.`);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Erreur lors de la récupération de l'utilisateur.",
        });
    }
};
