const router = require('express').Router();
const { checkToken } = require("../../auth/token_validation");
const { GetInductTraining, GetDeptTraining } = require('./TrainingRecord.controller');

router.get('/getInducttrainings/:id', checkToken, GetInductTraining)
// router.get('/getDeptTraining/:id', checkToken, GetDeptTraining)
router.post('/getDeptTraining', checkToken, GetDeptTraining)
module.exports = router;


