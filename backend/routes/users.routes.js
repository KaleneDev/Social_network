const express = require("express");
const router = express.Router();
const usersCtrl = require("../controllers/users.controller");
const authCtrl = require("../controllers/auth.controller");
const uploadCtrl = require("../controllers/upload.controller");
const { uploadUser } = require("../middleware/multer.middleware");

router.get("/", usersCtrl.getAll);
router.get("/id/:id", usersCtrl.getOne);
router.post("/", uploadUser, usersCtrl.create);
router.put("/id/:id",usersCtrl.update);
router.delete("/id/:id", usersCtrl.delete);

router.post("/register", authCtrl.signUp);
router.post("/login", authCtrl.signIn);
router.get("/logout", authCtrl.signOut);

router.post("/upload", uploadUser, uploadCtrl.uploadUser);

router.post("/follow", usersCtrl.follow);
router.post("/unfollow", usersCtrl.unfollow);
router.get("/followers/:id", usersCtrl.getFollowers);
router.get("/following/:id", usersCtrl.getFollowings);

router.post("/like", usersCtrl.like);

module.exports = router;
