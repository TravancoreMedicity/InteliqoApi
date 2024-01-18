const router = require('express').Router();
const { checkToken } = require("../../auth/token_validation");
const { getEmpNameByID, TrainerNameInsert, TrainerNameGet, TrainerNameUpdate, TrainerNameDelete } = require('./TrainerName.controller');


router.get('/select/:id', checkToken, getEmpNameByID)
router.post('/insert', checkToken, TrainerNameInsert)
router.get('/select', checkToken, TrainerNameGet)
router.patch('/update', checkToken, TrainerNameUpdate)
router.patch('/delete', checkToken, TrainerNameDelete)

module.exports = router;
