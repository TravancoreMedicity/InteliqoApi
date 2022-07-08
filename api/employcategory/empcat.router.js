const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { createEmpCategory, updateEmpCategory, inactiveEmpCategory,
    getEmpCateSelect, getEmpCategoryByID, getempCategoryData,
    getSelectContract, getProbationEndDetl, getProbationEndDetlbyDate,
    getContractEndDetl, getcontractEndDetlByDate } = require('../employcategory/empcat.controller');

router.post("/", checkToken, createEmpCategory);
router.patch("/", checkToken, updateEmpCategory);
router.delete("/", checkToken, inactiveEmpCategory);
router.get("/", checkToken, getempCategoryData);
router.get("/select", checkToken, getEmpCateSelect);
router.get("/getSelectContract", checkToken, getSelectContract);
router.get("/:id", checkToken, getEmpCategoryByID);
router.get("/probation/detl", checkToken, getProbationEndDetl);
router.post("/probationdetl", checkToken, getProbationEndDetlbyDate);
router.get("/contract/detl", checkToken, getContractEndDetl);
router.post("/contractdetl", checkToken, getcontractEndDetlByDate);

module.exports = router;