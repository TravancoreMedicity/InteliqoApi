const router = require('express').Router();
const { checkToken } = require("../../auth/token_validation");
const { GetTrainingTopics, GetPreLogEmpDetails, GetTrainingPostTopics, GetDashboardTrainingTopics } = require('./TrainingCommonTest.controller');

router.get('/ListPreTestTopics/:id', checkToken, GetTrainingTopics)
router.post('/logEmpDetails', GetPreLogEmpDetails)
router.get('/ListPostTesttTopics', checkToken, GetTrainingPostTopics)
router.get('/DashboardPreTestTopics', checkToken, GetDashboardTrainingTopics)
module.exports = router;


