const express = require("express");
const router = express.Router();
const usersCtrl = require("../controllers/users");
const multer = require("multer");
const path = require("path");

const filename = path.resolve();
const dirname = path.dirname(filename);

router.get("/", usersCtrl.getAll);
router.get("/:id", usersCtrl.getOne);
router.post("/", usersCtrl.create);
router.put("/:id", usersCtrl.update);
router.delete("/:id", usersCtrl.delete);
// console.log(dirname + "/frontend/public/assets");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(dirname, "frontend/public/assets"));
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});
const upload = multer({ storage: storage });

router.post("/upload", upload.single("file"), usersCtrl.upload);

module.exports = router;
