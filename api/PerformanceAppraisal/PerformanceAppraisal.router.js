const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const {
    getProbationEndList,
    getAnnualList,
    getTrainingList,
    getContractEndList,
    getLevel2Hierarchy,
    getLevel1Hierarchy,
    getIdOnly,
    createAppraisal,
    getInchargeAppraisalList,
    getHODAppraisalList,
    getCEODepartments,
} = require('../PerformanceAppraisal/PerformanceAppraisal.controller')


router.get("/list", checkToken, getProbationEndList);
router.get("/annualdata", checkToken, getAnnualList)
router.get("/trainingdata", checkToken, getTrainingList)
router.get("/contractdata", checkToken, getContractEndList)
router.get("/level2hier/:id", checkToken, getLevel2Hierarchy)
router.get("/level1/:id", checkToken, getLevel1Hierarchy)
router.get("/idonly", checkToken, getIdOnly)

router.post("/create", checkToken, createAppraisal)
router.post("/incharge/apprlist", checkToken, getInchargeAppraisalList)
router.post("/HOD/appraisalList", checkToken, getHODAppraisalList)
router.get("/CEO/DeptList", checkToken, getCEODepartments)


module.exports = router;