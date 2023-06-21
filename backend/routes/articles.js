const express = require("express");
const router = express.Router();
const articlesCtrl = require("../controllers/articles.controller");

router.get("/", articlesCtrl.getAll);
router.get("/:id", articlesCtrl.getOne);
router.post("/", articlesCtrl.create);
router.put("/:id", articlesCtrl.update);
router.delete("/:id", articlesCtrl.delete);

module.exports = router;