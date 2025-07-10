const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { InsertResignationRequest, getInchargePending, getResignationRequestByID,
    ResignationApprovalIncahrge, getHoDPending, getResignationRequestHOdByID,
    ResignationApprovalHOD, getHRPending, getResignationRequestHRByID,
    getCEOPending, getCEOPendingById, ResignationApprovalCEO, ResignationApprovalHR,
    getResignCancel, ResignationCancelHR, InsertResignationRequestContractClose,
    getHRPendingList, getContractClosed, getFullSettlementEmp, insertResigSalaryDetails,
    InactiveEmployee, getUnauthorizedAbsentee, InactiveEmploee, insertFromActiveEmp,
    getResignationRequestByEmpId, insertFinalSettlement, finalApprovalList,
    paymentSubmit, getSettlementData, getResignationByEmID, insertRetirmentLog,
    resignationHRReject } = require('../ResignationRequest/ResignationRequest.controller');

router.post("/", checkToken, InsertResignationRequest);
router.post("/resignlist", checkToken, getInchargePending);
router.get("/:id", checkToken, getResignationRequestByID);
router.patch("/", checkToken, ResignationApprovalIncahrge);
router.post("/resignlistHOD", checkToken, getHoDPending);
router.get("/hodpending/:id", checkToken, getResignationRequestHOdByID);
router.patch("/resignhod", checkToken, ResignationApprovalHOD);
router.post("/resignlistHR", checkToken, getHRPending);
router.get("/hrpendingbyID/:id", checkToken, getResignationRequestHRByID);
router.get("/", checkToken, getCEOPending);
router.get("/resign/resigncancel", checkToken, getResignCancel);
router.get("/ceopendingbyID/:id", checkToken, getCEOPendingById);
router.patch("/resignhr", checkToken, ResignationApprovalCEO);
router.patch("/resignapproval", checkToken, ResignationApprovalHR);
router.patch("/resigncancelhr", checkToken, ResignationCancelHR);
router.post("/contractcloseHrapprvl", checkToken, InsertResignationRequestContractClose);

router.get("/get/hrlist", checkToken, getHRPendingList)
router.get("/get/contractClosed", checkToken, getContractClosed)
router.get("/fullsetteleEmplo/all", checkToken, getFullSettlementEmp)
router.post("/insertResginDetails", checkToken, insertResigSalaryDetails)

router.patch("/Inactiveemp", checkToken, InactiveEmployee)
router.get("/getUnauthorized/absentee", checkToken, getUnauthorizedAbsentee)

router.post("/Inactive/fullandfinal", checkToken, InactiveEmploee)
router.post("/insert/resignation", checkToken, insertFromActiveEmp)
router.get("/getResignation/:id", checkToken, getResignationRequestByEmpId)
router.post("/insertFinal", checkToken, insertFinalSettlement)

router.get("/finalList/all", checkToken, finalApprovalList)
router.post("/update/payment", checkToken, paymentSubmit)
router.post("/getSettlement", checkToken, getSettlementData)
router.get("/resignationbyemid/:id", checkToken, getResignationByEmID)
router.patch("/resign/hrreject", checkToken, resignationHRReject)

//retirement process
router.post("/insert/retirement", checkToken, insertRetirmentLog)

module.exports = router;
