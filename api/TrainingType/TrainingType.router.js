const router = require('express').Router();
const { checkToken } = require("../../auth/token_validation");

const { TrainingTypeInsert, TrainingTypeGet, TrainingTypeUpdate, TrainingTypeDelete } = require('./TrainingType.controller');

router.post('/insert', checkToken, TrainingTypeInsert);
router.get('/select', checkToken, TrainingTypeGet)
router.patch('/update', checkToken, TrainingTypeUpdate)
router.patch('/delete/data', checkToken, TrainingTypeDelete)


module.exports = router;