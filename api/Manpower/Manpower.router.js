const router = require('express').Router();
const { checkToken } = require('../../auth/token_validation');

const { getDepartAndSectionEmpDetl, getData, insertmanpowerplanning, insertedu, getname,
    insertexp, closeannouncement, updateannouncement, getvacancy, getapprovalhod, getapprove,
    updateHrapproval, getapproval, updateHodapproval, updateDataManpowerapproval, getdesignation,
    insertmanpowerrequest, updatemanpowerplanning, insertpersonaldata } = require('../Manpower/Manpower.controller');

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
router.post("/closeAnnouncement", checkToken, closeannouncement)

// qualification insert on emp converion
router.post("/insertdataedu", checkToken, insertedu)
router.post("/insertdataexp", checkToken, insertexp)

// personalinformation insert
router.post("/personaldata", checkToken, insertpersonaldata)




module.exports = router;