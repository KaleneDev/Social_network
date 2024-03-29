const express = require("express");
const router = express.Router();
const articlesCtrl = require("../controllers/articles.controller");
const { uploadFile } = require("../middleware/multer.middleware");
const uploadCtrl = require("../controllers/upload.controller");

const { auth, authArticles } = require("../middleware/auth.middleware");

router.get("/", articlesCtrl.getAll);
router.get("/id/:id", articlesCtrl.getOne);
router.post("/", authArticles, uploadFile, articlesCtrl.create);
router.put("/id/:id", authArticles, uploadFile, articlesCtrl.update);
router.delete("/id/:id", authArticles, articlesCtrl.delete);

router.post("/upload", uploadFile, uploadCtrl.uploadArticle);
// router.post("/like/:id", auth, articlesCtrl.likeArticle);

// router.get("/like/:id", auth, articlesCtrl.likeArticle);
// router.get("/dislike/:id", auth, articlesCtrl.dislikeArticle);

// search articles
router.get("/search/:title", articlesCtrl.search);
module.exports = router;
