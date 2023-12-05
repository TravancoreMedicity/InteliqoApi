const router = require('express').Router();
const { checkToken } = require("../../auth/token_validation");
const { GetEmpOnlineTraining } = require('./TrainingOnline.controller');

router.get('/empOnlineTopics/:id', checkToken, GetEmpOnlineTraining)

module.exports = router; 
