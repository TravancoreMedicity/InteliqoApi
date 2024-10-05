const router = require('express').Router();
const { checkToken } = require("../../auth/token_validation");
const { TrainingSubTypeInsert, TrainingSubTypeGet, TrainingSubTypeUpdate, TrainingSubTypeDelete } = require('./TrainingSubType.controller');


router.post('/insert', checkToken, TrainingSubTypeInsert);
router.get('/select', checkToken, TrainingSubTypeGet)
router.patch('/update', checkToken, TrainingSubTypeUpdate)
router.patch('/delete', checkToken, TrainingSubTypeDelete)

module.exports = router;
