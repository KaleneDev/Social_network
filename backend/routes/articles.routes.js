const express = require("express");
const router = express.Router();
const articlesCtrl = require("../controllers/articles.controller");
const { uploadFile } = require("../middleware/multer.middleware");
const uploadCtrl = require("../controllers/upload.controller");

const { auth } = require("../middleware/auth.middleware");

router.get("/", articlesCtrl.getAll);
router.get("/id/:id", articlesCtrl.getOne);
router.post("/", auth, uploadFile, articlesCtrl.create);
router.put("/id/:id", auth, uploadFile, articlesCtrl.update);
router.delete("/id/:id", auth, articlesCtrl.delete);

router.post("/upload", uploadFile, uploadCtrl.uploadArticle);
// router.post("/like/:id", auth, articlesCtrl.likeArticle);

module.exports = router;
