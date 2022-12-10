const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { createLRequestType, updateLRequestType, inactiveLRequestType,
    getLRequestType, getSelectLRequestType, getLRequestTypeByID, emplv_list, employeeCommonLveType } = require('../leaveRequestType/leaveRequestType.controller');

router.post("/", checkToken, createLRequestType);
router.patch("/", checkToken, updateLRequestType);
router.delete("/", checkToken, inactiveLRequestType);
router.get("/", checkToken, getLRequestType);
router.get("/select", checkToken, getSelectLRequestType);
router.get("/:id", checkToken, getLRequestTypeByID);
router.get("/leavesetdata/:id", checkToken, emplv_list);
router.get("/empCommonLeave/:no", checkToken, employeeCommonLveType);

module.exports = router;