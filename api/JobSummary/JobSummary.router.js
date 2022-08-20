const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { createJobSummary, CheckInsertValue, createJobDuties, getjobId,
    createJobSpecification, createJobQualification, createJobGeneric,
    getJobSummary, getJobDuties, getJobSpecification, getJobGeneric, getJobQualification, createJobCompetency, getJobSummarydetl, updatejobsummarydetl } = require('../JobSummary/JobSummary.controller');

router.post("/", checkToken, createJobSummary);
router.post("/check", checkToken, CheckInsertValue);
router.post("/jobduties", checkToken, createJobDuties);
router.get("/", checkToken, getjobId);
router.post("/jobspecification", checkToken, createJobSpecification);
router.post("/jobqualification", checkToken, createJobQualification);
router.post("/jobGeneric", checkToken, createJobGeneric);
router.post("/getjobsummary", checkToken, getJobSummary);
router.post("/getjobduties", checkToken, getJobDuties);
router.post("/getjobspecific", checkToken, getJobSpecification);
router.post("/getjobgeneric", checkToken, getJobGeneric);
router.post("/getjobQual", checkToken, getJobQualification);



router.post("/getjob/Summary", checkToken, getJobSummarydetl)
router.post("/jobcompetency", checkToken, createJobCompetency)
router.patch("/update/jobsummary", checkToken, updatejobsummarydetl)

module.exports = router;