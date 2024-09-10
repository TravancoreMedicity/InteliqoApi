const router = require('express').Router();
const { checkToken } = require('../../auth/token_validation');
const { insertapplicationform, vacancyList, getname, insertDmsinterview, getselectionStatus, getselectionedu, getselectdesgstatus, insertJoining,
    getvacancy, insertMsinterview, insertHodinterview, getapplication, insertOperationinterview, insertselection, getempselect, getJoinpdfdata,
    insertInchargeinterview, insertinterview, insertcallletter, getquestion, insertCeointerview, getloginselect, updateselection, getpdfdata, insertJoinstatus,
    getempdetails, insertshortlistapprove, getstatus, getstatusdata, insertHrinterview, getinitialstatus, getlogindata, insertappointmentdata,
    insertAppmtstatus, insertAppmtcancelstatus, insertjoincancelstatus, insertInterviewLevel } = require('../Applicationform/applicationform.controller');



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
router.get("/Getquestion/:desigid", getquestion);
router.post("/interviewinsert", insertinterview)
router.post("/Inchargeinterviewinsert", checkToken, insertInchargeinterview)
router.post("/Hodinterviewinsert", checkToken, insertHodinterview)
router.post("/Msinterviewinsert", checkToken, insertMsinterview)
router.post("/Dmsinterviewinsert", checkToken, insertDmsinterview)
router.post("/Operationinterviewinsert", checkToken, insertOperationinterview)
router.post("/Ceointerviewinsert", checkToken, insertCeointerview)
router.post("/Hrinterviewinsert", checkToken, insertHrinterview)
router.post("/initialstatus", getinitialstatus)
router.post("/logindata", getlogindata)
router.post("/select", getloginselect)
router.post("/selection", checkToken, insertselection)
router.post("/selectionStatus", checkToken, getselectionStatus)
router.post("/selectionedu", checkToken, getselectionedu)
router.post("/updateselection", checkToken, updateselection)
router.post("/selectdesgstatus", getselectdesgstatus)
router.get("/empselect", checkToken, getempselect);

// appointment letter
router.post("/insertappointment", checkToken, insertappointmentdata)
router.post("/pdfdata", checkToken, getpdfdata);
router.post("/appointmentpdfstatus", checkToken, insertAppmtstatus)
router.post("/appointmentcancel", checkToken, insertAppmtcancelstatus)


// joining letter
router.post("/insertjoining", checkToken, insertJoining)
router.post("/Joinpdfdata", checkToken, getJoinpdfdata);
router.post("/joinpdfstatus", checkToken, insertJoinstatus)
router.post("/joincancel", checkToken, insertjoincancelstatus)

//interview Levels
router.post("/InterviewLevel", checkToken, insertInterviewLevel)




module.exports = router;