const router = require('express').Router();

const { getEmpNameByID, TrainerNameInsert, TrainerNameGet, TrainerNameUpdate, TrainerNameDelete } = require('./TrainerName.controller');


router.get('/select/:id', getEmpNameByID)
router.post('/insert', TrainerNameInsert)
router.get('/select', TrainerNameGet)
router.patch('/update', TrainerNameUpdate)
router.patch('/delete', TrainerNameDelete)

module.exports = router;
