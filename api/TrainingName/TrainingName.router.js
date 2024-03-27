const router = require('express').Router();
const { checkToken } = require("../../auth/token_validation");
const { TrainingNameInsert, TrainingNameGet, TrainingNameUpdate, TrainingNameDelete } = require('./TrainingName.controller');


router.post('/insert', checkToken, TrainingNameInsert);
router.get('/select', checkToken, TrainingNameGet);
router.patch('/update', checkToken, TrainingNameUpdate);
router.patch('/delete', checkToken, TrainingNameDelete);


module.exports = router;