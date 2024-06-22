const router = require('express').Router();
const { checkToken } = require("../../auth/token_validation");
const { GetInductList, GetInductAllData, UpdateVerification, GetDeptTrainings, GetDeptTrainingEmpList, UpdateDeptVerification } = require('./TrainingVerification.controller');

router.get('/getInductionData', checkToken, GetInductList)
router.get('/getInductEmpAllData/:id', GetInductAllData)
router.patch('/UpdateVerification', checkToken, UpdateVerification)
router.get('/GetDeptTrainings', GetDeptTrainings)
router.post('/getDeptEmpList', checkToken, GetDeptTrainingEmpList)
router.patch('/DeptVerification/list', checkToken, UpdateDeptVerification)
module.exports = router;
