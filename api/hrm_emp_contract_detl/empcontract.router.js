const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { creatempcontract, updateempcontract, getempcontractByID, updatecontractclose,
    updateContractRenew, getContractCloseDetl, getContractCloseDetlById } = require('../hrm_emp_contract_detl/empcontract.controller');

router.post("/", checkToken, creatempcontract);
router.patch("/", checkToken, updateempcontract);
router.patch("/contractclose", checkToken, updatecontractclose);
router.get("/:id", checkToken, getempcontractByID);
router.patch("/contractrenew", checkToken, updateContractRenew);
router.get("/", checkToken, getContractCloseDetl);
router.get("/contractclosedetl/:id", checkToken, getContractCloseDetlById);

module.exports = router;