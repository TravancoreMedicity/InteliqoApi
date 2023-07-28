const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { createJobSummary, CheckInsertValue, createJobDuties, getjobId,
    createJobSpecification, createJobQualification, createJobGeneric,
    getJobSummary, getJobDuties, getJobSpecification, getJobGeneric,
    getJobQualification, createJobCompetency, getJobSummarydetl,
    updatejobsummarydetl, getjobcompetency, getjobDescView,
    updateDutiesEach, deleteduties, updateCompeteEach,
    deletecompetency, deletePerformance, updatePerforEach,
    deleteQualifi, updateGeneric, getKPIScore, getJobDutiesById,
    getJobCompetencyById, getJobPerformanceById, getJobGenericById,
    getJobQualifiById, getJobSummaryById, createSkills, getSkills, deleteskills,
    updateSkills
} = require('../JobSummary/JobSummary.controller');

//job summery    
router.post("/", checkToken, createJobSummary);
router.post("/check", checkToken, CheckInsertValue);
router.get("/getjobSummary/:id", checkToken, getJobSummarydetl)
router.post("/getjobsummary", checkToken, getJobSummary);
router.patch("/updatejobsummary", checkToken, updatejobsummarydetl)

// duties & responsibilities 
router.post("/jobduties", checkToken, createJobDuties);
router.patch('/updatedutieseach', checkToken, updateDutiesEach)
router.delete("/deletedata/select/:id", checkToken, deleteduties);
router.get("/", checkToken, getjobId);
router.post("/getjobduties", checkToken, getJobDuties);


//job performance
router.post("/jobspecification", checkToken, createJobSpecification);
router.post("/getjobspecific", checkToken, getJobSpecification);
router.delete('/deletePerf/:id', checkToken, deletePerformance)
router.patch('/updateperf', checkToken, updatePerforEach)

//job competencym
router.post("/jobcompetency", checkToken, createJobCompetency)
router.post('/get/jobcompetency', checkToken, getjobcompetency)
router.patch('/updatecompeteEach', checkToken, updateCompeteEach)
router.delete('/deletecompet/:id', checkToken, deletecompetency)

//job qualication
router.post("/jobqualification", checkToken, createJobQualification);
router.post("/getjobQual", checkToken, getJobQualification);
router.delete('/deleteQualification/:id', checkToken, deleteQualifi)

//generic
router.post("/jobGeneric", checkToken, createJobGeneric);
router.post("/getjobgeneric", checkToken, getJobGeneric);
router.get("/jobview", checkToken, getjobDescView)
router.patch('/updategeneric', checkToken, updateGeneric)
router.post('/getscore', checkToken, getKPIScore)


//pdfreport
router.get("/getduties/:id", checkToken, getJobDutiesById)
router.get("/getcompbyid/:id", checkToken, getJobCompetencyById)
router.get("/getperfombyid/:id", checkToken, getJobPerformanceById)
router.get("/getgenricByid/:id", checkToken, getJobGenericById)
router.get("/getqualibyid/:id", checkToken, getJobQualifiById)
router.get("/getsummByid/:id", checkToken, getJobSummaryById)

//skills
router.post("/skill/create", checkToken, createSkills)
router.post("/skills/get", checkToken, getSkills)
router.delete("/skills/delete/:id", checkToken, deleteskills)
router.patch("/skills/update", checkToken, updateSkills)

module.exports = router;