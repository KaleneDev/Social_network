const express = require("express");
const router = express.Router();
const usersCtrl = require("../controllers/users.controller");
const authCtrl = require("../controllers/auth.controller");
const upload = require("../middleware/multer.middleware");
// const auth = require("../middleware/auth");

// const multer = require("multer");
// const path = require("path");

// const filename = path.resolve();
// const dirname = path.dirname(filename);

router.get("/", usersCtrl.getAll);
router.get("/:id", usersCtrl.getOne);
router.post("/", usersCtrl.create);
router.put("/:id", usersCtrl.update);
router.delete("/:id", usersCtrl.delete);

router.post("/register", authCtrl.signUp);
router.post("/login", authCtrl.signIn);

router.post("/upload", upload, usersCtrl.upload);

module.exports = router;
