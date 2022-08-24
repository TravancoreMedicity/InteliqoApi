const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const {
    getProbationEndList,
    getAnnualList,
    getTrainingList
} = require('../PerformanceAppraisal/PerformanceAppraisal.controller')


router.get("/list", checkToken, getProbationEndList);
router.get("/annualdata", checkToken, getAnnualList)
router.get("/trainingdata", checkToken, getTrainingList)

module.exports = router;