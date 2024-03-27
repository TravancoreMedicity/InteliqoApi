const router = require('express').Router();
const { checkToken } = require("../../auth/token_validation");
const { GetTrainingTopics, GetPreLogEmpDetails, GetTrainingPostTopics } = require('./TrainingCommonTest.controller');

router.get('/ListPreTestTopics/:id', checkToken, GetTrainingTopics)
router.post('/logEmpDetails', GetPreLogEmpDetails)
router.get('/ListPostTesttTopics', checkToken, GetTrainingPostTopics)

module.exports = router;


