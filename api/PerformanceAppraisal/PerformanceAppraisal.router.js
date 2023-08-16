const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const {
    getProbationEndList,
    getAnnualList,
    getTrainingList,
    getContractEndList,
    getContractRenewList,
    createPerformanceAppraisal,
    checkIdExist,
    getDataAll,
    getHodData,
    getInchargeData,
    getExistDetails,
    createCompetencyAssessment,
    getTrainingNeed,
    createPerformanceAssessment,
    getCeoData,
    getPerfAssById,
    createPerformanceScore,
    inchargeCareerAdvancement,
    careerEmpIdExist,
    hodCareerAdvancement,
    updateHodCareer,
    ceoCareerAdvancement,
    updateCeoCareer,
    createExistDetl,
    updatePerformanceAssessment,
    getCompetencyAll,
    updateComptencyAssessment,
    updateEmpStatus,
    getHRAPpraisalList,
    completedAppraisal,
    pendigAppraisal,
    trainingPending,
    probationPending,
    permanentPending,
    empCareerAdvancement,
    empIdExistCareerAdvance,
    updateEmployeeStatus,
    contractPending,
    updateInchargeRemark,
    getScoreDtails,
    updateScoreDetl,
    getEmployeeStatus
} = require('../PerformanceAppraisal/PerformanceAppraisal.controller')


//dashboard count
router.get("/list", checkToken, getProbationEndList);
router.get("/annualdata", checkToken, getAnnualList)
router.get("/trainingdata", checkToken, getTrainingList)
router.get("/contractdata", checkToken, getContractEndList)
router.get("/contractclosed", checkToken, getContractRenewList)

//to submit employees for appraisal process 
//create appraisal detls to hrm_performance_apprsl
router.post("/create/data", checkToken, createPerformanceAppraisal)
router.post("/getdetls", checkToken, checkIdExist)
router.get("/all", checkToken, getDataAll)
router.patch("/update/empstatus", checkToken, updateEmpStatus)

//appraisal dashborad count
router.get("/hodData/:id", checkToken, getHodData)
router.get("/inchargeData/:id", checkToken, getInchargeData)
router.get("/ceodata", checkToken, getCeoData)

router.get("/existdetl/:id", checkToken, getExistDetails)
router.post("/create/existdetl", checkToken, createExistDetl)
// performance assessment
router.post("/createPerf", checkToken, createPerformanceAssessment)
router.get("/Perfdata/:id", checkToken, getPerfAssById)//to get hrm_performance_assessment tabledata with empid
router.patch("/update/performance", checkToken, updatePerformanceAssessment)//to update scoren justification to table
router.post("/createComp", checkToken, createCompetencyAssessment)//submitting competency to table 
router.get("/getAll/compt/:id", checkToken, getCompetencyAll)
router.patch("/update/compt", checkToken, updateComptencyAssessment)
router.get("/trainingneed/:id", checkToken, getTrainingNeed)//training need details
//to store performance score
router.post("/createScore", checkToken, createPerformanceScore)

//checking employee id already exist
router.get("/check/careerid/:id", checkToken, careerEmpIdExist)
router.post("/inchargeremark", checkToken, inchargeCareerAdvancement)
router.patch("/update/incharge/remark", checkToken, updateInchargeRemark)
router.post("/hodRemark", checkToken, hodCareerAdvancement)
router.patch("/update/hod", checkToken, updateHodCareer)
router.post("/ceoRemark", checkToken, ceoCareerAdvancement)
router.patch("/updateCeoCareer", checkToken, updateCeoCareer)
router.post("/empremark", checkToken, empCareerAdvancement)
router.get("/check/careerEmpid/:id", empIdExistCareerAdvance)
router.patch("/update/career/empstatus", checkToken, updateEmployeeStatus)
router.get("/Score/details/:id", checkToken, getScoreDtails)
router.patch("/update/score", checkToken, updateScoreDetl)
router.get("/empstatus/detil/:id", checkToken, getEmployeeStatus)

//hr list
router.get('/hrlist', checkToken, getHRAPpraisalList)
router.get("/completed", checkToken, completedAppraisal)
router.get("/pendg", checkToken, pendigAppraisal)
router.get("/training/pendng", checkToken, trainingPending)
router.get("/probation/pendng", checkToken, probationPending)
router.get('/permanent/pendng', checkToken, permanentPending)
router.get("/contract/pendng", checkToken, contractPending)







module.exports = router;