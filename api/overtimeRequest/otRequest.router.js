const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { createotRequest, getOtByID, getOtBySlno, updateotRequest, getIncharge, getinchargeBySlno,
    inchargeApprove, getHod, gethodBySlno, hodApprove, getHr, hrApprove, gethrBySlno, getceo,
    ceoApprove, getceoBySlno, inactiveOTRequest, getOTforCalculation, insertLeaveCalculated,
    updateCoffTable, updatecoffslno, inchargecancel, getPunchByDate, getOTDetails,
    getEmpShiftDetails, getAllHr, getAllceo, updatePunchtaken, resetPunchTaken } = require('../overtimeRequest/otRequest.controller')

router.post("/", checkToken, createotRequest);
router.patch("/", checkToken, updateotRequest);

router.post("/othr", checkToken, getHr)
router.post("/get/otcalc", checkToken, getOTforCalculation)
router.post("/leavecalculated/insert", checkToken, insertLeaveCalculated)

router.patch("/inchargeapprove", checkToken, inchargeApprove);
router.patch("/hodapprove", checkToken, hodApprove);
router.patch("/hrapprove", checkToken, hrApprove);
router.patch("/ceoapprove", checkToken, ceoApprove);
router.patch("/coff/insert", checkToken, updateCoffTable);
router.patch("/cofftabl/slno/update", checkToken, updatecoffslno);
router.patch("/cancelot/dept", checkToken, inchargecancel);
router.get("/select/:id", checkToken, getOtBySlno);
router.get("/:id", checkToken, getOtByID);
router.get("/incharge/list/:id", checkToken, getinchargeBySlno)
router.get("/hod/list/:id", checkToken, gethodBySlno)
router.get("/hr/list/:id", checkToken, gethrBySlno)
router.get("/ceo/list/:id", checkToken, getceoBySlno)
router.delete("/delete/:id", checkToken, inactiveOTRequest);


//
router.post("/otincharge", checkToken, getIncharge)
router.post("/othod", checkToken, getHod)
router.get("/otceo/data", checkToken, getceo);

router.post("/punchdatabydate", checkToken, getPunchByDate)
router.get("/details/:id", checkToken, getOTDetails)
router.post("/shiftdata", checkToken, getEmpShiftDetails)
router.get("/allhrot/data/list", checkToken, getAllHr)
router.get("/allceo/list", checkToken, getAllceo)
router.patch("/update/punch", checkToken, updatePunchtaken)
router.patch("/inactive/punch", checkToken, resetPunchTaken)


module.exports = router;