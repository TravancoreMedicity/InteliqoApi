const router = require('express').Router();
const { checkToken } = require('../../auth/token_validation');
const { insertapplicationform, vacancyList, getname, getvacancy, getapplication, insertcallletter, getempdetails, insertshortlistapprove, getstatus, getstatusdata } = require('../Applicationform/applicationform.controller');



router.post("/insertdata", checkToken, insertapplicationform)
router.post("/list", checkToken, vacancyList)
router.post("/eduname", checkToken, getname)
router.get("/vacancylist", checkToken, getvacancy);
router.get("/application", checkToken, getapplication);
router.post("/empdetails", checkToken, getempdetails)
router.post("/shortlistapprove", checkToken, insertshortlistapprove)
router.post("/statusdetails", checkToken, getstatus)
router.post("/statusdata", checkToken, getstatusdata)
router.post("/callletterinsert", checkToken, insertcallletter)
module.exports = router;