const Users = require("../models/Users.model");
const Relation = require("../models/Follow.model");

exports.getAll = async (req, res) => {
    // GET all relations
    try {
        const relations = await Relation.findAll({});
        res.status(200).json(relations);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Erreur lors de la récupération des relations.",
        });
    }
};
exports.followUser = async (req, res) => {
    // POST a relation
    try {
        const { user_id, following_id } = req.body;
        // Check if relation already exists
        const relationExists = await Relation.findOne({
            where: {
                following_id: following_id,
                follower_id: user_id,
            },
        });
        if (relationExists) {
            return res.status(400).json({
                message: "Cette relation existe déjà.",
            });
        }
        const relation = await Relation.create({
            following_id: following_id,
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
exports.unfollowUser = async (req, res) => {
    try {
        const { unFollowing_id, user_id } = req.body;
        const relation = await Relation.findOne({
            where: {
                following_id: unFollowing_id,
                follower_id: user_id,
            },
        });
        console.log(relation);
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
