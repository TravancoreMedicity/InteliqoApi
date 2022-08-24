const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { createrights, selectrights, getAppraisalRightByID, update,
    employeeByDepartment, HodInchargeNames, employeeByID, HODInsert,
    selecthod, getAppraisalRightByHOD, updatehod, getUserRights, createPerformanceAppraisal } = require('../performanceappriasalrights/performanceappriasalrights.controller');


router.post("/insert", checkToken, createrights);
router.get("/data", checkToken, selectrights)
router.get("/ByID/:id", checkToken, getAppraisalRightByID)
router.patch("/updatedataa", checkToken, update)
router.get("/EmpByDept/:id", checkToken, employeeByDepartment)
router.get("/names/list", checkToken, HodInchargeNames)
router.get("/Byname/:id", checkToken, employeeByID)
router.post("/hodinsert", checkToken, HODInsert)
router.get("/selectbyhod/data", checkToken, selecthod)
router.get("/byhod/:id", checkToken, getAppraisalRightByHOD)
router.patch("/updatehodin", checkToken, updatehod)

router.get("/userrights/:id", checkToken, getUserRights)
router.post("/createappraisal", checkToken, createPerformanceAppraisal)

module.exports = router;