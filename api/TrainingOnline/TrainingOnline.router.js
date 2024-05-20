const router = require('express').Router();
const { checkToken } = require("../../auth/token_validation");
const { GetEmpOnlineTraining, GetPretestQRdetails, GetPosttestQRdetails, GetInductOnlineTraining } = require('./TrainingOnline.controller');

router.get('/empOnlineTopics/:id', GetEmpOnlineTraining)
router.get('/postTestEmpDetails/:id', GetPosttestQRdetails)
//QRCODE
router.get('/preTestEmpDetails/:id', GetPretestQRdetails)
//induction
router.get('/inductempOnlineTopics/:id', GetInductOnlineTraining)

module.exports = router; 
