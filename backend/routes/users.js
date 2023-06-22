const express = require("express");
const router = express.Router();
const usersCtrl = require("../controllers/users.controller");
const authCtrl = require("../controllers/auth.controller");
const upload = require("../middleware/multer.middleware");
const auth = require("../middleware/auth.middleware");

router.get("/", auth, usersCtrl.getAll);
router.get("/id/:id", usersCtrl.getOne);
router.post("/", usersCtrl.create);
router.put("/id/:id", usersCtrl.update);
router.delete("/id/:id", usersCtrl.delete);

router.post("/register", authCtrl.signUp);
router.post("/login", authCtrl.signIn);
router.get("/logout", authCtrl.signOut);

router.post("/upload", upload, usersCtrl.upload);

module.exports = router;
