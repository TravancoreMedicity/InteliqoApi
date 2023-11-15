const router = require('express').Router();
const { checkToken } = require('../../auth/token_validation');

const { getDepartAndSectionEmpDetl, getData, insertmanpowerplanning, getname, updateannouncement, getvacancy, getapprovalhod, getapprove, updateHrapproval, getapproval, updateHodapproval, updateDataManpowerapproval, getdesignation, insertmanpowerrequest, updatemanpowerplanning } = require('../Manpower/Manpower.controller');

router.post("/getEmpDet", checkToken, getDepartAndSectionEmpDetl)
router.post("/insertdata", checkToken, insertmanpowerplanning)
router.post('/getdesig', checkToken, getname);
router.post("/getdesgdet", checkToken, getdesignation)
// for update
router.post("/updatedata", checkToken, updatemanpowerplanning)
router.post('/get/all', checkToken, getData);
// manpower request
router.post("/insertDataManpower", checkToken, insertmanpowerrequest)
// approval
router.get("/approvalget/all", checkToken, getapproval);
router.post("/approvalgethod/all", checkToken, getapprovalhod);

router.post("/updateDataManpower", checkToken, updateDataManpowerapproval)
router.post("/updateHodApproval", checkToken, updateHodapproval)
router.post("/updateHrApproval", checkToken, updateHrapproval)
// view approval
router.post('/getapprovedata', checkToken, getapprove);
// vacancy announcement
router.post('/vacancy', checkToken, getvacancy);
router.post("/updateAnnouncement", checkToken, updateannouncement)


module.exports = router;