const router = require('express').Router();

const { TrainingNameInsert, TrainingNameGet, TrainingNameUpdate, TrainingNameDelete } = require('./TrainingName.controller');


router.post('/insert', TrainingNameInsert);
router.get('/select', TrainingNameGet);
router.patch('/update', TrainingNameUpdate);
router.patch('/delete', TrainingNameDelete);

module.exports = router;