const router = require('express').Router();
const { checkToken } = require("../../auth/token_validation");

const { TrainingTypeInsert, TrainingTypeGet, TrainingTypeUpdate, TrainingTypeDelete } = require('./TrainingType.controller');

router.post('/insert', TrainingTypeInsert);
router.get('/select', TrainingTypeGet)
router.patch('/update', TrainingTypeUpdate)
router.patch('/delete/data', checkToken, TrainingTypeDelete)


module.exports = router;