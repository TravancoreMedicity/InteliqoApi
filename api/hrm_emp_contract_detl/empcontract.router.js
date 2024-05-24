const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { creatempcontract, updateempcontract, getempcontractByID, updatecontractclose,
    getContractCloseDetl, getContractCloseDetlById, createContractlog,
    InsertArrearSalaryContractRenew, updateContractComplete, updateConreactrenewAppr,
    getContractRenewApprovalList, updateQualEmpId, EmpIDExpUpdate, UpdateEMpIdEarnDeduction,
    UpdateEMpIdPersonal, getContractByEmno, getContractDetlId,
    getEmployeeByUserName, updateContractEmployee } = require('../hrm_emp_contract_detl/empcontract.controller');

router.post("/", checkToken, creatempcontract);
router.patch("/", checkToken, updateempcontract);
router.patch("/contractclose", checkToken, updatecontractclose);
router.get("/:id", checkToken, getempcontractByID);
router.get("/", checkToken, getContractCloseDetl);
router.get("/contractclosedetl/:id", checkToken, getContractCloseDetlById);
router.post("/createcontractlog", checkToken, createContractlog);
// router.patch("/updateEmpMaster", checkToken, updateEmpMaster);
router.post("/arrearSalary", checkToken, InsertArrearSalaryContractRenew);

router.patch("/contractrenewapprove", checkToken, updateConreactrenewAppr);
router.get("/contractrenewapprlist/renewlist", checkToken, getContractRenewApprovalList);

router.patch("/updateQual", checkToken, updateQualEmpId);
router.patch("/updateExp", checkToken, EmpIDExpUpdate)
router.patch("/updateEarn", checkToken, UpdateEMpIdEarnDeduction)
router.patch("/updatePersonal", checkToken, UpdateEMpIdPersonal)
router.get("/contractByno/:id", checkToken, getContractByEmno)
router.get("/detailByid/:id", checkToken, getContractDetlId)

// router.patch("/update/punchmast", checkToken, updatePunchmstEmno)
router.get("/empdetails/:id", checkToken, getEmployeeByUserName)

router.patch("/contractrenew", checkToken, updateContractComplete);
router.patch("/update/contract", checkToken, updateContractEmployee)



module.exports = router;