const router = require("express").Router();
const { checkToken } = require('../../auth/token_validation');
const { getReport, getPunchMasterDataSectionWise, getDutyPlanBySection, getPunchmastData, getPunchDataEmCodeWiseDateWise, getPunchDataDptWiseDateWise, getPunchMasterDataDeptWise } = require('../AttendenceReport/AttendenceReport.controller');

router.post("/GetAttendenceReport", checkToken, getReport)
router.post("/getPunchMasterDataSectionWise", checkToken, getPunchMasterDataSectionWise);
router.post("/getDutyPlanBySection", checkToken, getDutyPlanBySection);
router.post("/getPunchDataEmCodeWiseDateWise", checkToken, getPunchDataEmCodeWiseDateWise);
router.post("/getPunchDataDptWiseDateWise", checkToken, getPunchDataDptWiseDateWise);
router.post("/getPunchMasterDataDeptWise", checkToken, getPunchMasterDataDeptWise);
router.post("/getPunchmastData", checkToken, getPunchmastData)


module.exports = router;