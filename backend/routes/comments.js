const express = require('express');
const router = express.Router();
const commentsCtrl = require('../controllers/comments');

router.get('/', commentsCtrl.getAll);
router.post('/', commentsCtrl.create);
router.get('/:id', commentsCtrl.getOne);
router.put('/:id', commentsCtrl.update);
router.delete('/:id', commentsCtrl.delete);

module.exports = router;