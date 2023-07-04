const express = require("express");
const router = express.Router();
const usersCtrl = require("../controllers/users.controller");
const authCtrl = require("../controllers/auth.controller");
const uploadCtrl = require("../controllers/upload.controller");
const { uploadUser } = require("../middleware/multer.middleware");
const cors = require("cors");
const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
    allowedHeaders: ["sessionId", "Content-Type"],
    exposedHeaders: ["sessionId"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
};

router.get("/", usersCtrl.getAll);
router.get("/id/:id", usersCtrl.getOne);
router.put("/id/:id",usersCtrl.update);
router.delete("/id/:id", usersCtrl.delete);

router.post("/register", authCtrl.signUp);
router.post("/login", authCtrl.signIn);
router.get("/logout", authCtrl.signOut);

router.post("/upload", uploadUser, uploadCtrl.uploadUser);

router.patch("/follow/:id", usersCtrl.follow);
router.patch("/unfollow/:id", usersCtrl.unfollow);
router.get("/followers/:id", usersCtrl.getFollowers);
router.get("/following/:id", usersCtrl.getFollowings);

router.post("/like", usersCtrl.like);

module.exports = router;
