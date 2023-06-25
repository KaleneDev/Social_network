const express = require('express');
const router = express.Router();
const commentsCtrl = require('../controllers/comments.controller');
const { uploadFile } = require("../middleware/multer.middleware");

router.get('/', commentsCtrl.getAll);
router.post('/',uploadFile, commentsCtrl.create);
router.get('/id/:id', commentsCtrl.getOne);
router.put('/id/:id', commentsCtrl.update);
router.delete('/id/:id', commentsCtrl.delete);

module.exports = router;