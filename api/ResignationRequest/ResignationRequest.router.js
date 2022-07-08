const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { InsertResignationRequest, getInchargePending, getResignationRequestByID,
    ResignationApprovalIncahrge, getHoDPending, getResignationRequestHOdByID,
    ResignationApprovalHOD, getHRPending, getResignationRequestHRByID,
    getCEOPending, getCEOPendingById, ResignationApprovalCEO, ResignationApprovalHR,
    getResignCancel, ResignationCancelHR, InsertResignationRequestContractClose } = require('../ResignationRequest/ResignationRequest.controller');

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
module.exports = router;
