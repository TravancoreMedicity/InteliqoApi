const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { getTrainingprob, getcatedetl } = require('../TraingProbaReport/TrainingProbaReport.controller')


router.get('/trainingprob', getTrainingprob);
router.post('/catedetl', getcatedetl)

module.exports = router;