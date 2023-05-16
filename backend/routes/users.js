const express = require("express");
const router = express.Router();
const usersCtrl = require("../controllers/users");

router.get("/", usersCtrl.getAll);
router.get("/:id", usersCtrl.getOne);
router.post("/", usersCtrl.create);
router.put("/:id", usersCtrl.update);
router.delete("/:id", usersCtrl.delete);

module.exports = router;
