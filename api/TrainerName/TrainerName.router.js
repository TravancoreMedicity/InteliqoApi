const router = require('express').Router();
const { checkToken } = require("../../auth/token_validation");
const { getEmpNameByID, TrainerNameInsert, TrainerNameGet, TrainerNameUpdate, TrainerNameDelete, GetTrainerDetails, TrainerNameDeptSecWise } = require('./TrainerName.controller');


router.get('/select/:id', checkToken, getEmpNameByID)
router.post('/inserttrainers', checkToken, TrainerNameInsert)
router.get('/select', checkToken, TrainerNameGet)
router.patch('/update', checkToken, TrainerNameUpdate)
router.patch('/delete', checkToken, TrainerNameDelete)
router.get('/gettrainerDetails/:id', checkToken, GetTrainerDetails);
router.post('/selectDeptSectnWise', checkToken, TrainerNameDeptSecWise)
module.exports = router;
