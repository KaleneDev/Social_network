const express = require("express");
const router = express.Router();
const articlesCtrl = require("../controllers/articles");

router.get("/", articlesCtrl.getAll);
router.get("/:id", articlesCtrl.getOne);
router.post("/", articlesCtrl.create);

module.exports = router;